
import { Toast } from 'native-base';

const Toaster = (props) => {
  const { text, textStyle, buttonText, buttonTextStyle, buttonStyle, position, type } = props
  Toast.show({
    ...props,
  })

}

const SuccessToaster = (props) => {
  // const { text, textStyle, buttonText, buttonTextStyle, buttonStyle, position, type } = props

  const toasterData = {
    text: props, position: 'top', duration: 4000, buttonText: 'X', style: {
      backgroundColor: "green", marginTop: 0, marginHorizontal: 20, borderRadius: 5, color: 'blue'
    },
    textStyle: { color: 'white' }, buttonTextStyle: { color: 'white' }
  }
  Toast.show({
    ...toasterData,
  })

}

const WarningToaster = (props) => {
  const { text, textStyle, buttonText, buttonTextStyle, buttonStyle, position, type } = props
  Toast.show({
    ...props,
  })

}

const ErrorToaster = (props) => {
  // const { text, textStyle, buttonText, buttonTextStyle, buttonStyle, position, type } = props
  const toasterData = {
    text: props, position: 'top', duration: 4000, buttonText: 'X', style: {
      backgroundColor: "#ee4436", marginTop: 0, marginHorizontal: 20, borderRadius: 5, color: 'blue'
    },
    textStyle: { color: 'white' }, buttonTextStyle: { color: 'white' }
  }
  Toast.show({
    ...toasterData,
  })

}

//export default Toaster

export default {
  Toaster,
  SuccessToaster,
  ErrorToaster
}


// text	-	string	Text content to be shown in the toast
// textStyle	-	-	Style text content for toast
// buttonText	-	string, blank	Text to be displayed inside the button
// buttonTextStyle	-	-	Style button text for toast
// buttonStyle	-	-	Style button for toast
// position	bottom	top, bottom	Sets position for the toast
// type	-	danger, success, warning	Sets context to the Toast
// duration	1500	user defined (integer)	Milliseconds after which Toast disappears
// onClose(reason)	-	function	Called just before the toast hides. reason can be "user" when the user click on the button; "timeout" when timeout.
// show()	-	function	Displays the Toast
// hide()	-	function	Hides the Toast
// style	-	style object	Style for the Toast