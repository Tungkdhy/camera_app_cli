import { StyleSheet, Dimensions, Platform } from 'react-native';
const height = Dimensions.get('window').width;
const width = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  contentFull: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    zIndex: 1000,
  },
  activeFull: {
    paddingTop: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    paddingBottom: 12,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
  },
  active: {
    paddingTop: 12,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    paddingBottom: 12,
  },
  cam: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    gap: 4,
    ...Platform.select({
      ios: {
        paddingTop: 10,
        paddingLeft: 8,
      },
    }),
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  info: {
    paddingTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    // transform: [{rotateZ: '90deg'}],
  },
  infoFull: {
    position: 'absolute',
    top: 2,
    left: 12,

    // paddingTop: 8,
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    // position: 'absolute',
    // top: -360,
    // left: -160,
    // bottom: 0,
    // right: 100,
    // backgroundColor:"black"
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        paddingTop: 44,
      },
      android: {
        paddingTop: 16,
      },
    }),
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  text: {
    padding: 10,
    paddingLeft: 16,
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    // marginTop: 4,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    paddingBottom: 12,
    paddingTop: 12,
    gap: 8,
  },
  image: {
    flex: 2,
  },
  detail: {
    flex: 5,
    paddingLeft: 20,
  },
  time: {
    flexDirection: 'row',
    gap: 12,
    paddingBottom: 4,
    fontSize: 11,
  },
  fileName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    paddingBottom: 4,
  },
  service: {
    flexDirection: 'row',
    gap: 4,
  },
  serviceItem: {
    padding: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 12,
    color: 'black',
  },
  filter: {
    paddingTop: 10,
    paddingBottom: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    justifyContent: 'space-between',
    display: 'flex',
  },
  btnFilter: {
    padding: 6,
    paddingLeft: 18,
    paddingRight: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    // flex:1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    justifyContent: 'center',
    // flexDirection:"row"
  },
  textContent: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  fullScreen: {
    ...Platform.select({
      ios: {
        height: Dimensions.get('screen').width,
        width: Dimensions.get('screen').height - 70,
      },
      android: {
        height: Dimensions.get('screen').width,
        width: '100%',
      },
    }),
  },
  time: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
  input_picker: {
    minWidth: 200,
    padding: 0,
    // marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
    paddingLeft: -2,
  },
  modalViewDate: {
    height: 430,
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 16,
  },
  centeredView: {
    backgroundColor: '#00000047',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  modalView: {
    height: 600,
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingTop: 16,
  },
  modalHeader: {
    paddingTop: 4,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    paddingLeft: 16,
    paddingRight: 16,
  },
  titleHeader: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  iconModal: {
    position: 'absolute',
    right: 0,
    top: 6,
    zIndex: 100,
    width: 36,
    height: 50,
  },
  modalContent: {
    padding: 16,
  },
  infoItem: {
    flexDirection: 'row',
    paddingBottom: 16,
  },
  titleInfo: {
    flex: 4,
  },
  descriptionInfo: {
    flex: 11,
    paddingLeft: 16,
  },
  title: {
    color: ' rgba(0, 0, 0, 0.4)',
  },
});
