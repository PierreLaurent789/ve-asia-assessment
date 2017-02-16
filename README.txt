VeAsia Client-side – server-side Assessment


V02 : Sending the captures the values to a back-end application and the back-end returns the same data with the letters capitalized


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



V01 : only javascript
You will find with this README.txt file, the javascript file "youcanedit.js"

To make this work, you need to place the javascript file "youcanedit.js" at the root of your VeAsia Assessment project, same level as the "index.html" file.

The assignement was to gather information in a HTML page, modify them, and print them back in a defined area of the same page.
The major issue where indeed that none of the element were affected ID's. Indeed, it very easy to get an element from it's ID but become very tricky when were dealing with raw data like in this index.html file.

Here are some remarks about my work :
1) I decided to not include jQuery for this exercice for 2 main reasons:
	a) JQuery is a very heavy library and i'm in general trying to include it the less possible in my works
	b) I didn't want to risk any dependecy issues
2) I decided to do only 1 JS file tant contain all the functions i'm using because it's only 130 lines total, which is very manageable, readable and more importantly maintainable.
3) I didnt know how to deal with that ID issue in the first place but after some research I decided to learn how to use Xpath, which I had never encourtered in the past, so it took me a long time to figure out how all this was working. That explain why the code can be pretty heavy and is still optimizable.

Thank you for your time and I hope you'll appreciate my work.
Pierre LAURENT

