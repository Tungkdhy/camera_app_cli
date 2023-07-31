import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    // paddingTop: 44,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#0040FF',
  },
  text: {
    padding: 10,
    // paddingLeft: 16,
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  content: {
    padding: 12,
  },
  item: {
    flexDirection: 'row',
    display: 'flex',
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    flex: 1,
    color: 'rgba(0, 0, 0, 0.4)',
  },
  description: {
    flex: 2,
    color: '#000000',
    paddingLeft: 12,
  },
  infoItem: {
    // flexDirection: 'column',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  titleInfo: {
    // flex: 4,
    marginBottom: 4,
    color: 'rgba(0, 0, 0, 0.40)',
    fontSize: 12,
    lineHeight: 18,
    fontWeight: 400,
  },
  descriptionInfo: {
    color: 'black',
    fontSize: 14,
    lineHeight: 20,
    fontWeight: 400,
  },
  modalContent: {
    padding: 16,
  },
});
