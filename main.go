package main

import (
	"log"
	"net/http"
)

func main() {
	// The directory containing your React build
	buildDir := "./build"

	// Serve static files (JS, CSS, images, etc.)
	fs := http.FileServer(http.Dir(buildDir))
	http.Handle("/", fs)

	port := ":8081"
	log.Printf("🚀 Serving React build on http://localhost%s\n", port)

	// Start server
	err := http.ListenAndServe(port, nil)
	if err != nil {
		log.Fatal(err)
	}
}
