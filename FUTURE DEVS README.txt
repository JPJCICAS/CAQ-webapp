-For the html files, only index will be named as index.html whilst all other html files like main-quiz will have no file extension so that the browser does not have a .html extension.
-If you are using Amazon EC2, do keep all files in the same directory unless you can find a way to not do so.
-There is near zero security for the development of it so viewer cheating is easy. The best way is to set the website to fullscreen (F11) before starting or showing the game so that they do not know the website. This is because by visiting the subpage /question.csv, they can download the questions. Not only that, they can inspect element and read the javascript as well as use and manipulate the javascript variables to their advantage.
-For css margins, paddings, width and heights, always try to use calc with vw/vh for different resolution supports.
-Browser support is ONLY for Chrome but it doesn't mean it won't work on other browsers.
-Only Questions support commas and answers do not. Avoid putting in commas for answers in the csv file. It should be fine if you want to fix the code (I'm lazy).
-v1 to v3 is depreciated. Don't use them, please.


----------------OFFLINE--VERSION------------------
you have to put in the quesions as a csv txt in the code itself
for example:

actual csv:

boi,boi,boi
yes,no,why
why,not,pls 
end,this,ok

how you should input inside the data variable in the main-quiz.js 

data = 'boi,boi,boi\nyes,no,why\nwhy,not,pls\nend,this,ok'

