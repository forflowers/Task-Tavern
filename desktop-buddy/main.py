from flask  import Flask, render_template

app = Flask('desktop_buddy')


@app.route('/')
def home():
	return render_template('buddy_view.html' , buddy_name = "Wizard")

if __name__ == '__main__':
	app.run(debug=True)
