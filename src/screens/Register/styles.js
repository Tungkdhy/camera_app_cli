import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  content: {
    // flexDirection:"column",
    // position:"absolute",
    justifyContent: "flex-end",
    // alignItems:"flex-end",
    // bottom:40,
    // left:20,
    // right:20
    height: "100%",
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,

  },
  text: {
    color: "#ffffff",
    fontSize: 28,
    paddingBottom: 16,
    width: "50%",
    textAlign: "left"
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0040FF',
    padding: 14,
    borderRadius: 4
  },
  btnText: {
    color: "#ffffff"
  },
  countText: {
    color: '#FF00FF',
  },
  touch: {
    width: "48%"
  },
  buttonRegister: {
    alignItems: 'center',
    padding: 13,
    borderRadius: 4,
    borderColor: "#fff",
    borderWidth: 1
  },
  description: {
    paddingBottom: 16,
    color: "rgba(255, 255, 255, 0.7);",
    fontSize: 18
  },
  title: {
    paddingTop: 100,
    position: "relative"
  },
  contentLogin: {
    backgroundColor: "linear-gradient(180deg, rgba(0, 64, 255, 0.69) 0%, rgba(0, 64, 255, 0.39) 100%)",
    height: "100%",
    justifyContent: "space-between",
  },
  formLogin: {

    padding: 16
  },
  logo: {
    alignItems: "center",
    marginBottom: 30
  },
  error: {
    color: "red",
    fontSize: 12,
    paddingTop: 6,
    paddingLeft: 16
  },
  contentForm: {
    height: "95%",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    display: "flex",

    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  input: {
    marginTop: 10,
    borderWidth: 1,
    padding: 12,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 4,
    paddingLeft: 12,

  },
  login: {
    marginTop: 24,
    marginBottom: 100
  },
  buttonLogin: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: "#0040FF",


  },
  forgot: {
    textAlign: "center",
    paddingTop: 24,
    color: "#0040FF",

  },
  textLogin: {
    color: "#fff",
    fontSize: 24,
    textAlign: "center"
  },
  icon: {
    position: "absolute",
    bottom: 12,
    left: 20,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 10,
    borderRadius: 50,
    zIndex: 10
  },
  register: {
    paddingBottom: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  re: {
    color: "#0040FF",
  },
  borderError: {
    borderColor: "red",
    color: "red"
  },
  userIcon: {
    position: "absolute",
    top: 40,
    left: 12
  },
  lockIcon: {
    position: "absolute",
    top: 132,
    left: 12
  },
  eyeIcon: {
    position: "absolute",
    top: 136,
    right: 12,
    zIndex: 10
  },
  header: {
    fontSize: 24,
    fontWeight: "600",
    paddingBottom: 24

  },
  text: {
    fontSize: 12
  },
  validate: {
    fontSize: 12,
    paddingTop: 6,
    paddingBottom: 6
  }
  ,
  label: {
    paddingTop: 12
  },
  input_picker: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 4,
    paddingLeft: -2,
  },
})