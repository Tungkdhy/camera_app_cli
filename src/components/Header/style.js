import { StyleSheet, Platform } from 'react-native';

export const style = StyleSheet.create({
  content: {
    backgroundColor: '#0040FF',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    color: '#ffffff',
    ...Platform.select({
      ios: {
        paddingTop: 44,
      },
      android: {
        // paddingTop:12
      },
    }),
  },
  text: {
    color: '#ffffff',
    padding: 10,
    paddingLeft: 16,
    fontSize: 18,
    fontWeight: '700',
  },
  icons: {
    flexDirection: 'row',
    display: 'flex',
    gap: 12,
    paddingRight: 16,
  },
  notification: {
    position: 'relative',
  },
  count: {
    position: 'absolute',
    height: 20,
    width: 20,
    top: -12,
    left: 10,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 12,
    display: 'flex',
    textAlign: 'center',
    lineHeight: 18,
    fontSize: 9,
  },
  input: {
    ...Platform.select({
      ios: {
        padding: 16,
      },
      android: {
        padding: 12,
      },
    }),
    // borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 40,
    // marginBottom: 30,
    color: '#000',
    flex: 1,
    backgroundColor: '#fff',
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#0040FF',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
});
