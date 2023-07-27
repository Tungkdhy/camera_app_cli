import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#0040FF'
  },
  content: {
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    paddingBottom: 16,
    width: '100%',
    textAlign: 'center',
    marginTop: 25,
    fontWeight: 600,
    lineHeight: 20,
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formInput: {
    position: 'relative',
    flexDirection: 'row',
    // paddingBottom: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0040FF',
    padding: 14,
    borderRadius: 4,
  },
  btnText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 24
  },
  countText: {
    color: '#FF00FF',
  },
  touch: {
    width: '48%',
  },
  buttonRegister: {
    alignItems: 'center',
    padding: 13,
    borderRadius: 4,
    borderColor: '#fff',
    borderWidth: 1,
  },
  description: {
    paddingBottom: 16,
    color: 'rgba(255, 255, 255, 0.7);',
    fontSize: 18,
  },
  title: {
    paddingTop: 70,
    position: 'relative',
  },
  contentLogin: {
    backgroundColor: '#0040FF',
    height: '100%',
    justifyContent: 'space-between',
  },
  formLogin: {
    padding: 16,
    position: 'absolute',
    top: 11,
    zIndex: 99,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  error: {
    color: 'red',
    fontSize: 12,
    ...Platform.select({
      ios: {
        top: 58,
      },
      android: {
        top: 68,
      },
    }),
    left: 8,
    position: 'absolute',
    width: '100%',
  },
  error_password: {
    color: 'red',
    fontSize: 12,
    ...Platform.select({
      ios: {
        top: 56,
      },
      android: {
        top: 66,
      },
    }),
    left: 8,
    position: 'absolute',
    width: '100%',
  },
  contentForm: {
    height: '100%',
    justifyContent: 'space-between',
    // backgroundColor: '#ffffff',
    display: 'flex',
    // flexDirection: 'column-reverse',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    alignContent: 'flex-end',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    ...Platform.select({
      ios: {
        padding: 16,
      },
      android: {
        padding: 12,
      },
    }),
    borderRadius: 4,
    paddingLeft: 42,
    paddingRight: 40,
    marginBottom: 12,
    color: '#000',
    width: '100%',
  },
  login: {
    marginTop:12,
  },
  buttonLogin: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#ACFCCF',
    color: 'black',
    height: 48,
  },
  forgot: {
    textAlign: 'center',
    paddingTop: 28,
    paddingBottom: 16,
    color: '#ACFCCF',
    fontSize: 16,
    fontWeight: 700,
    lineHeight: 24
  },
  textLogin: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    bottom: -8,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    padding: 10,
    borderRadius: 50,
    zIndex: 10,
  },
  register: {
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  re: {
    color: '#0040FF',
  },
  borderError: {
    borderColor: 'red',
    color: 'red',
  },
  userIcon: {
    position: 'absolute',
    top: 14,
    left: 10,
    zIndex: 9999,
  },
  lockIcon: {
    position: 'absolute',
    top: 14,
    left: 10,
    zIndex: 9999,
  },
  eyeIcon: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 14,
      },
      android: {
        top: 14,
      },
    }),
    right: 12,
    zIndex: 1000,
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    gap: 16,
  },
  modal: {},
  mainView: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerModal: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 8,
    top: '40%',
    left: '10%',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  textHeader: {
    color: '#333',
    fontSize: 20,
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 80,
    textAlign: 'center',
  },
  imageBg: {
    width: '100%',
    bottom: 0,
    marginTop: 'auto',
    marginBottom: 0,
  },
  text_header: {
    color: '#FFF',
    fontSize: 28,
    lineHeight: 39.2,
    fontWeight: 600,
  },
  text_desc: {
    color: 'rgba(255, 255, 255, 0.70)',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    width: 313,
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%'
  },
  button_footer: {
    width: '50%',
    backgroundColor: 'transparent'
  },
  button_footer_item: {
    backgroundColor: 'transparent',
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
    color: 'black',
    height: 48,
  },
  text_desc_modal: {
    color: '#333',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: 24,
    width: 313,
    textAlign: 'center',
    padding: 16,
    paddingTop: 0,
  },
  primary: {
    color: '#F30'
  },
  iconHeader: {
    marginTop: 16
  }
});
