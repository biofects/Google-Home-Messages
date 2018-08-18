# Google Home Messages

Google Home Messages - Send Messages using tts to a Google Home Device. Use this to create events in IFTTT or schedule messages. This is Docker ready or stand alone NPM. I am running this on a Raspberry PI

## Getting Started

Google Home Messages is written in Javascript for NodeJS and will install all required packages as needed. This uses TTS to send messages to google home.

### Prerequisites
```
nodejs --version
v8.9.3

docker --version
Docker version 17.09.1-ce, build 19e2cf6

Port Forwarding needs to be set up on your netowrk in order to make the calls externally.

```
## Installing

### Clone this repo

```
git clone https://github.com/biofects/Google-Home-Messages.git

```
### Go into Google-Home-Messages 

```
cd Google-Home-Messages

```
### Edit setting

```
vim config/settings.json

```
```
        "mytoken" : "CreateAGoodToken", 
        "lang" : "en",
        "speed" : 1,
	"port" : 8092,
        "debug" : "true"
```
* [languages](https://cloud.google.com/speech/docs/languages)


### Install the NodeJS App

```
npm install

```

### Test package

```
npm start

```

### Build Docker Image if using Docker

```
sudo docker build -t <user>/googlehomemessages  /path/to/Aapp/Google-Home-Messages/

```

### Start Docker
```
sudo docker run -p 8092:8092 -d <user>/googlehomemessages

```

### Set up IFTTT with your Google Home
```
Go to [IFTTT](https://ifttt.com)
For *THIS* I use wifi check.
For *THAT* choose: *Maker Webhooks*
    1. Choose *Make a web request*
    2. In *URL* enter:
      >YOUR_Public_iP/google-home-messages
    3. Post with JSON data
    4. Body 
      >{"text":"Hello, From Biofects","ipaddress":"Internal ip of google home","token":"TokenFromSettings"}
```
## Running the tests

Using curl
```curl -d '{"text":"Hello, Lee. Have a nice day","ipaddress":"192.168.1.26","token":"hejd%ya83!!"}' -H "Content-Type: application/json" -X POST http://192.168.1.113:8092/google-home-messages
192.168.1.26 will say: Hello, Lee. Have a nice day.```

*Thank you sepodele* [!(https://github.com/biofects/Google-Home-Messages/issues/3)]
On windows you need to use double quotes around the json.



## Authors

* **Lee Thompson** - *Initial work*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

* Inspiration
https://github.com/noelportugal/google-home-notifier

#### Donate to get geek stuff(sorry no beer here)

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TWRQVYJWC77E6)
