# Grubber

Grubber is a program that provides a consumer the autonomous ability to quickly hire people for odd jobs the typical person is not normally fond of, all within one app. Whether it is lawn care, indoor house cleaning services, pressure washing and much more, you have the ability to receive an instant estimated quote and purchase these services at the touch of a button.

## External Requirements

In order to build this project you first have to install:

* [Node.js](https://nodejs.org/en/)
   * You will also want to install Node.js package manager npm with instructions found [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04).
* [Android Studio](https://developer.android.com/studio/?gclid=Cj0KCQjwiNSLBhCPARIsAKNS4_czZZ8qTIG6V1sBmGGpt5doHKe01koHvBUY1MGQVu9Z5VZL4kSrSd0aAuH7EALw_wcB&gclsrc=aw.ds)
   * Android Studio is recommended as the primary emulator for the app.  Once downloaded, proceed to create a new AVD running Android 10.0 and API 29.
   * You may also choose to use the Expo client app on your mobile device, downloadable in the google play store
* A Code editor, to view and edit code
    * We recommend using [Visual Studio Code](https://code.visualstudio.com/), which is available on all OS's


*For more information, view the Expo Cli Quickstart section found here, [React Native Developer Docs](https://reactnative.dev/docs/environment-setup)*

## Setup

After downloading the external requirements, clone the repo and enter the following commands into your terminal:

* `npm install -g expo -cli`
* `npm install`
* `yarn add firebase`
* `npm uninstall firebase`
* `npm cache clear --force`
* `npm i firebase@8.10.0`


## Running

In order to run the application:

* Enter command `expo start` or `npm start` in cloned repo
* After execution, enter `a`
* Have android emulator waiting for start. 


# Deployment

Webapps need a deployment section that explains how to get it deployed on the 
Internet. These should be detailed enough so anyone can re-deploy if needed
. Note that you **do not put passwords in git**. 

Mobile apps will also sometimes need some instructions on how to build a
"release" version, maybe how to sign it, and how to run that binary in an
emulator or in a physical phone.

# Testing

The unit tests and behavorial are in `/__tests__/`.

## Testing Technology

install: yarn add --dev jest

## Running Tests
run : yarn test
# Authors

<p>Adam Farley adamfarley4@gmail.com</p>
<p>Raymond Seas rseas@email.sc.edu</p>
<p>Petros Yiannikouros yianniko@email.sc.edu</p>
