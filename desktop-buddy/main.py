from flask  import Flask, render_template

app = Flask('desktop_buddy')


@app.route('/')
def home():
	return "<h1>Hello!"

if __name__ == '__main__':
	app.run(debug=True)
