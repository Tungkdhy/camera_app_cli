import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    //    backgroundColor:"#E5E5E5"
    flex: 1,
    justifyContent:"space-between",
    display:"flex",
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    // justifyContent: "space-between",
    flexDirection: 'row',
    paddingTop: 44,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    justifyContent: 'center',
    backgroundColor: '#fff',
    // flex:1,
  },
  back: {
    // position: 'relative',
    left: -72,
    top: 2,

    // left:-40
  },
  space:{
    padding:4,
    backgroundColor:"#E5E5E5"
  },
  text: {
    padding: 10,
    paddingLeft: 16,

    fontSize: 18,
    fontWeight: '700',
    color: 'rgba(0, 0, 0, 1)',
  },
  service: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  itemActive: {
    borderBottomColor: '#0040FF',
    borderBottomWidth: 2,
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  textItemActive: {
    color: '#0040FF',
  },
  textItem: {
    color: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#fff',
  },
  contentItem: {
    paddingTop: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: 'rgba(0, 0, 0, 1)',
  },
  primary: {
    color: '#0040FF',
    paddingRight: 4,
  },
  btn: {
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1,
    paddingLeft: 29,
    paddingRight: 29,
    paddingTop: 6,
    paddingBottom: 6,
    borderColor: 'rgba(0, 0, 0, 0.2)',
  },
  actions:{
    display:"flex",
    flexDirection:"row",
    padding:12,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
    flex:1,
 
  },
  save:{
    marginLeft:2,
    backgroundColor:"#0040FF"
  },
  cancel:{
    marginRight:2,
    backgroundColor:"#FF3300"
  },

});
