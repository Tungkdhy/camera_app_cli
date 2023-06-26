import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  content: {
    justifyContent: 'flex-end',
    height: '100%',
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  text: {
    color: '#ffffff',
    fontSize: 28,
    paddingBottom: 16,
    width: '50%',
    textAlign: 'left',
  },
  actions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formInput: {
    position: 'relative',
    flexDirection: 'row',
    paddingBottom: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0040FF',
    padding: 14,
    borderRadius: 4,
  },
  btnText: {
    color: '#ffffff',
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
    backgroundColor:
      'linear-gradient(180deg, rgba(0, 64, 255, 0.69) 0%, rgba(0, 64, 255, 0.39) 100%)',
    height: '100%',
    justifyContent: 'space-between',
  },
  formLogin: {
    padding: 16,
  },
  logo: {
    alignItems: 'center',
    marginBottom: 30,
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
    // height: '70%',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    display: 'flex',
    // flexDirection: 'column-reverse',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
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
    marginBottom: 30,
    color: '#000',
    width: '100%',
  },
  login: {
    // marginTop:24
  },
  buttonLogin: {
    padding: 12,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#0040FF',
  },
  forgot: {
    textAlign: 'center',
    paddingTop: 28,
    paddingBottom: 16,
    color: '#0040FF',
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
    top: 18,
    left: 12,
  },
  lockIcon: {
    position: 'absolute',
    top: 16,
    left: 12,
  },
  eyeIcon: {
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 14,
      },
      android: {
        top: 118,
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
    fontSize: 24,
    fontWeight: '600',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 80,
    textAlign: 'center',
  },
});
