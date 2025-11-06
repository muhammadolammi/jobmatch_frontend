import { api } from "../api/client";
import { ResultType } from "../types";

interface Props {
    onResult: (data: ResultType) => void;
    sessionId: string;
    files: FileList | null,
    setStatus: React.Dispatch<React.SetStateAction<string>>,
    jobTitle: string,
    jobDescription: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
}
const uploadFileToR2 = async (
    uploadUrl: string,
    file: File,
    onProgress: (percent: number) => void
) => {
    return new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl);
        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                onProgress(percent);
            }
        };
        xhr.onload = () => {
            if (xhr.status === 200) resolve();
            else reject(new Error(`Upload failed: ${xhr.status}`));
        };
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(file);
    });
};

export const handleUpload = async (prop: Props) => {
    if (!prop.files || prop.files.length === 0) {
        prop.setStatus("⚠️ Please select at least one file.");
        return;
    }

    prop.setLoading(true);
    prop.setStatus("Uploading resume(s)...");

    try {
        for (let i = 0; i < prop.files.length; i++) {
            const file = prop.files[i];

            // 1️⃣ Get presigned URL from backend
            const presignRes = await api.post(`/sessions/${prop.sessionId}/presign`, {
                file_name: file.name,
                mime_type: file.type || "application/octet-stream",
            });
            const { upload_url, object_key } = presignRes.data;

            // 2️⃣ Upload directly to R2 with progress
            await uploadFileToR2(upload_url, file, (percent) =>
                prop.setStatus(`Uploading ${file.name}: ${percent}%`)
            );

            // 3️⃣ Notify backend upload is done
            await api.post("/uploads/complete", {
                session_id: prop.sessionId,
                object_key,
                file_name: file.name,
                size: file.size,
                mime_type: file.type,
            });
        }

        // Continue your analysis flow after uploads
        prop.setStatus("✅ Upload complete. Running analysis...");

        const payload = {
            job_title: prop.jobTitle,
            job_description: prop.jobDescription,
            session_id: prop.sessionId,
        };
        await api.post("/analyze", payload);

        const res = await api.get(`/results/${prop.sessionId}`);
        prop.onResult(res.data[0]);
        prop.setStatus("✅ Analysis complete.");
    } catch (err: any) {
        prop.setStatus("❌ Upload failed: " + (err.message || "Unknown error"));
    } finally {
        prop.setLoading(false);
    }
};

