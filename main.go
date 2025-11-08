package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	// The directory containing your React build
	buildDir := "./build"

	// Serve static files (JS, CSS, images, etc.)
	fs := http.FileServer(http.Dir(buildDir))

	// SPA handler
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Construct absolute path
		path := filepath.Join(buildDir, r.URL.Path)

		// Check if file exists
		if _, err := os.Stat(path); os.IsNotExist(err) {
			// If file does not exist, serve index.html
			http.ServeFile(w, r, filepath.Join(buildDir, "index.html"))
			return
		}

		// Otherwise serve the file
		fs.ServeHTTP(w, r)
	})

	port := ":8081"
	log.Printf("🚀 Serving React build on http://localhost%s\n", port)

	// Start server
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
