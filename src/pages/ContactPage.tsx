import { getContactDepartments, postContactMessage } from "../api/contacts";
import Footer from "../components/Footer";
import MainHeader from "../components/MainHeader";
import { Mail, PhoneCall, Locate, ExternalLink, SendHorizonal } from 'lucide-react';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useSearchParams, } from "react-router-dom";
import Select from "react-select";

export default function ContactPage() {
    type Option = { value: string; label: string };

    const [searchParams, setSearchParams] = useSearchParams();
    const dept = searchParams.get("department");
    const [currentDepartment, setCurrentDepartment] = useState<Option | null>(null);
    const [contactDepartments, setContactDepartments] = useState<{ id: string, name: string }[]>([]);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        message: "",
        department_id: "",
    });


    useEffect(() => {
        const fetchProfessions = async () => {
            const res = await getContactDepartments();
            setContactDepartments(res);

        };

        fetchProfessions();
    }, []);

    // useEffect(() => {
    //     if (dept && contactDepartments.length > 0) {
    //         const found = contactDepartments.find(
    //             (d) => d.name.toLowerCase() === dept.toLowerCase()
    //         );

    //         if (found) {
    //             setCurrentDepartment({
    //                 value: found.id,
    //                 label: found.name
    //             });
    //         }
    //     }
    // }, [dept, contactDepartments]);
    useEffect(() => {
        if (contactDepartments.length > 0) {
            let selectedDept: Option | null = null;

            if (dept) {
                // Find department from URL param
                const found = contactDepartments.find(
                    (d) => d.name.toLowerCase() === dept.toLowerCase()
                );
                if (found) {
                    selectedDept = { value: found.id, label: found.name };
                }
            }

            // Default to General Inquiry if none found
            if (!selectedDept) {
                const general = contactDepartments.find(
                    (d) => d.name.toLowerCase() === "general inquiry"
                );
                if (general) {
                    selectedDept = { value: general.id, label: general.name };
                }
            }

            setCurrentDepartment(selectedDept);

            // Also update formData
            setFormData((prev) => ({
                ...prev,
                department_id: selectedDept?.value || "",
            }));
        }
    }, [dept, contactDepartments]);

    const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();



        if (!formData.first_name || !formData.last_name || !formData.email || !formData.message) {
            alert("All fields are required");
            return;
        }

        if (formData.message.length > 500) {
            alert("Message is too long");
            return;
        }

        const result = await postContactMessage(formData);

        if (result) {
            alert("Message sent successfully!");
            setFormData({
                first_name: "",
                last_name: "",
                email: "",
                message: "",
                department_id: "",
            });
        } else {
            alert("Failed to send message. Try again later.");
        }

    };
    return (
        <div>
            <MainHeader />
            <main className="flex-1 max-w-7xl mx-auto w-full px-6 md:px-20 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">Get in Touch</h1>
                            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
                                Whether you're a job seeker looking for your next role or an employer aiming to scale your team, we're here to help.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8">
                            <form action="#" className="space-y-6" onSubmit={onFormSubmit}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" >First Name</label>
                                        <input
                                            onChange={(e) =>
                                                setFormData({ ...formData, first_name: e.target.value })
                                            }
                                            className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                                            id="first-name" name="first-name" placeholder="Alex" type="text"

                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" >Last Name</label>
                                        <input
                                            onChange={(e) =>
                                                setFormData({ ...formData, last_name: e.target.value })
                                            }
                                            className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                                            id="last-name" name="last-name" placeholder="Alex" type="text" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" >Email Address</label>
                                        <input
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 text-sm"
                                            id="email" name="email" placeholder="alex@company.com" type="email" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Department</label>
                                    <div className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 text-sm"

                                    >
                                        <Select
                                            isSearchable={false}
                                            value={currentDepartment}
                                            onChange={(option) => {
                                                setCurrentDepartment(option);
                                                if (option) {
                                                    setSearchParams({ department: option.label });
                                                }
                                            }}
                                            options={contactDepartments.map(p => ({
                                                value: p.id,
                                                label: p.name
                                            }))}
                                            placeholder="Select a department"
                                        />
                                    </div>


                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" >Message</label>
                                    <textarea
                                        onChange={(e) =>
                                            setFormData({ ...formData, message: e.target.value })
                                        }
                                        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-primary focus:border-primary px-4 py-3 text-sm resize-none"
                                        placeholder="How can we help you?" rows={5}
                                        maxLength={500}>

                                    </textarea>
                                </div>
                                <button className="w-full md:w-auto px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all flex items-center justify-center gap-2" type="submit">
                                    <span>Send Message</span>
                                    <SendHorizonal className="w-4 h-4 " />

                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="h-48 bg-slate-200" data-alt="Modern office building map location"
                                style={{
                                    backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCXwRPIV6KdSY77eB7JLwuaAurtK0ZuuSAu8ePKO1B3YIe54vDRlDSxgsWMBC4r0ESNRkERo-uVYgwh0sojOsFFrEKXyascR-IN8eSeNbtJ698T0aE7DmRjl31RhmUB1Sdb5vPC2KWywiNkAxfv6_JZZtNP4pzQLoBCEPMIIcaaBMcKFbcVy0ymxDnkdF1BkGZo1GIQoNa_P3swQxFWe-_cuF_cAc0z7J2QrR8PXwihqAe5gBqxwxf7kAHBfa0BYce0X9BvExe4MFBv")`,
                                }}
                            // style="background-image: url(''); background-size: cover;"
                            ></div>
                            <div className="p-8 space-y-6">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Contact Information</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <Mail className="w-5 h-5 " />
                                            <div>
                                                <p className="text-sm font-semibold">Email</p>
                                                <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary" href="mailto:go@n3xtbridge.com">go@n3xtbridge.com</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <PhoneCall className="w-5 h-5 " />

                                            <div>
                                                <p className="text-sm font-semibold">Phone</p>
                                                <a className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary" href="tel:+15551234567">+234 9015313705</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Locate className="w-5 h-5 " />

                                            <div>
                                                <p className="text-sm font-semibold">Office</p>
                                                <p className="text-sm text-slate-600 dark:text-slate-400" data-location="Abuja">11, Paul Amune <br />Flat 2, Phase 1<br />Gwagwalada Abuja, Nigeria</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">Follow Us</h3>
                                    <div className="flex gap-4">
                                        <a className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all" href="#">
                                            <span className="material-symbols-outlined">share</span>
                                        </a>
                                        <a className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all" href="#">
                                            <span className="material-symbols-outlined">groups</span>
                                        </a>
                                        <a className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all" href="#">
                                            <span className="material-symbols-outlined">public</span>
                                        </a>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                        <div className="bg-primary p-8 rounded-xl text-white">
                            <h3 className="text-xl font-bold mb-2">Need quick help?</h3>
                            <p className="text-slate-300 text-sm mb-6">Check out our Help Center for documentation and quick answers to common questions.</p>
                            <Link className="inline-flex items-center gap-2 text-sm font-bold bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all" to="/help-center">
                                Visit Help Center
                                <ExternalLink className="w-5 h-5 " />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}