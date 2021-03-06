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
		print "\nGot the POST!\n"
		content_len = int(self.headers.getheader('content-length', 0))
		post_body = self.rfile.read(content_len)
		print "Received object : \n (%s)" % (post_body)
		postUPPER = post_body.upper()
		
		#sending the post_body upper as a response, that my JS wil catch
		response = postUPPER
		self.send_response(200)
		self.end_headers()
		self.wfile.write(str(response))   
		print "\n Sending back JSON :"
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