#!/usr/bin/python
from BaseHTTPServer import BaseHTTPRequestHandler,HTTPServer
import json

PORT_NUMBER = 8080

#This class will handles any incoming request from
#the browser 
class myHandler(BaseHTTPRequestHandler):

	def do_OPTIONS(self):
	    self.send_response(200, "ok")
	    self.send_header('Access-Control-Allow-Origin', '*')
	    self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
	    self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
	    self.send_header("Access-Control-Allow-Headers", "Content-Type")
	    self.end_headers()
	    	
	#Handler for the POST request

	def do_POST(self):
		print "got post!!"
		content_len = int(self.headers.getheader('content-length', 0))
		post_body = self.rfile.read(content_len)
		print "post_body(%s)" % (post_body)
		postUPPER = post_body.upper()
		print "post UPPER(%s)" % (postUPPER)
		print "%s" % post_body
		test_data = json.loads(post_body)
		print "test_data(%s)" % (test_data)

		response = postUPPER
		self.send_response(200)
		self.end_headers()
		self.wfile.write(str(response))    
		print response; 


try:
	#Create a web server and define the handler to manage the
	#incoming request
	server = HTTPServer(('', PORT_NUMBER), myHandler)
	print 'Started httpserver on port ' , PORT_NUMBER
	
	#Wait forever for incoming htto requests
	server.serve_forever()

except KeyboardInterrupt:
	print '^C received, shutting down the web server'
	server.socket.close()