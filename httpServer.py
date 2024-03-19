import mimetypes
import http.server
import socketserver
mimetypes.init()
mimetypes.add_type('text/javascript', '.js')
mimetypes.guess_type('main.js')

handler = http.server.SimpleHTTPRequestHandler
port = 8080
httpd = socketserver.TCPServer(("",port),handler)


print(f"Serving on port {port}")

httpd.serve_forever()