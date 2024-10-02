from flask import Flask, request, redirect

app = Flask(__name__)

@app.route('/grab/mahör')
def grab_ip(url):
    ip_adress = request.remote_addr
    print(f"IP ADdress of the visitor: {ip_adress}")
    return redirect(f'https://www.hs-rm.de/de/')


if __name__== '__main__':
    app.run(debug=True, host='0.0.0.0')
