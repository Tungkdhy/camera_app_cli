// {/* <View style={styles.modalContent}>
// {isProvince ? (
//   <></>
// ) : (
//   <View style={styles.title}>
//     <Pressable
//       onPress={() => {
//         setIsProvince();
//         setInput('');
//       }}>
//       <Back />
//     </Pressable>
//     <Text style={styles.textDist}>
//       Chọn quận, huyện, thị xã
//     </Text>
//   </View>
// )}

// <View style={styles.search}>
//   <TextInput
//     value={input}
//     onChangeText={data => onChangeTextSearch(data)}
//     style={styles.input}
//     placeholder="Tìm kiếm"
//   />
// </View>

// <ScrollView>
//   <View style={styles.item}>
//     <CheckBox
//       containerStyle={styles.radio}
//       title="Tất cả"
//       checkedIcon={<RadioCheck />}
//       uncheckedIcon={<Radio />}
//       onPress={() => {
//         dispatch(setProvinceCode(''));
//         dispatch(setDistrictCode(''));
//       }}
//       checked={filter === '' ? true : false}
//     />
//     {/* <Pressable onPress={() => setIsProvince()}>
// <NextIcon />
// </Pressable> */}
//   </View>
//   {data.map((item, index) => {
//     return (
//       <Pressable
//         onPress={() => {
//           dispatch(
//             isProvince
//               ? setProvinceCode({
//                 code: item.code,
//                 name: item.name,
//               })
//               : setDistrictCode({
//                 code: item.code,
//                 name: item.name,
//               }),
//           );
//           setIsProvince();
//           setInput('');
//         }}
//         key={index}
//         style={styles.item}>
//         <CheckBox
//           containerStyle={styles.radio}
//           title={item.name}
//           key={index}
//           checkedIcon={<RadioCheck />}
//           uncheckedIcon={<Radio />}
//           checked={filter === item.code ? true : false}
//           onPress={() => {
//             dispatch(
//               isProvince
//                 ? setProvinceCode({
//                   code: item.code,
//                   name: item.name,
//                 })
//                 : setDistrictCode({
//                   code: item.code,
//                   name: item.name,
//                 }),
//             );
//             setIsProvince();
//             setInput('');
//           }}
//         />
//         {isProvince && (
//           <View>
//             <NextIcon />
//           </View>
//         )}
//       </Pressable>
//     );
//   })}
// </ScrollView>
// </View> */}