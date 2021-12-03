// Web Server em Go
package main // não roda sem essa linha
import "net/http"

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("Hello my Children"))
	})

	http.ListenAndServe(":8080", nil)
}
