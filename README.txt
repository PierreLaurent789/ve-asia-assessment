VeAsia Client-side – server-side Assessment


V02 : Sending the captured values to a back-end application and the back-end returns the same data with the letters capitalized

Set a python simple server : Handler BaseHTTPRequestHandler
My first issuewas that i couldn't simply access localhost with XMLHTTPRequest due to same-origin policy limitations. 
I had to add the “Allow-Control-Allow-Origin” chrome extension and enable cross-origin resource sharing .
I can now can send data from my js file to the python server on http://localhost:8080

The python get what I POST from my javascript with the do_POST method, capitalize the entire JSON object and send it back as the response with self.wfile.write()

How to make this work :
1) download the vebackendapp.py and the new youcaneditjs.js files.
2) run the python file from a terminal
3) open the html file in a browser

PS: if the CORS problem arise, make sure that you enable the cross-origin resource sharing.
PS2: The JS file is starting to be heavy and not easily maintainable, I would eventually spread the functions across several files and compile them in a minified "youcaneditjs.js" one if i had more time.
PS3 : The pyhon file is a little ugly and would also deserve to be arranged in a better way (then we can create functions to save the data in a DB for example and actually treat the data in a specific function and not in the do_POST.

Thank you for your time and do not hesitate to ask me more about all this!
Pierre LAURENT



