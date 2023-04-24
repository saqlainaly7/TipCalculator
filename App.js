import { StatusBar } from 'expo-status-bar';
import { useState ,useEffect} from 'react';
import { StyleSheet, FileList,TextInput, Text, View, TouchableOpacity, FlatList } from 'react-native';

const App = () => {

  const [bill, setBill] = useState('');
  const [percentage, setPercentage] = useState('');
  const [tip, setTip] = useState('5');
  const[DATA,setData]=useState([]);


  
  const AddData = () => {
    if (bill.length > 0 && percentage.length > 0) {

      let result=parseFloat(bill*(percentage/100));
      let billdata=parseFloat(bill);

      let tipdata=parseInt(result+billdata);


      setData([...DATA, { key: new Date(), Bill:bill, Percentage:percentage, TipAmount:tip, Total_Bill:tipdata }]);
      setBill('');
      setPercentage('');
      console.log(DATA.length);
    }
  };

const CalculateTotal=()=>{
if(bill && percentage!==null){
  alert("You Have Successfully Calculated the Total Amount of Bill! Thanks!")

}
else{
  alert("Please First Fill the fields Then Press on Calculate Button! Thanks! ")
}

}


  const DeleteItem=(key)=>{
    const FilterData=DATA.filter(element=>element.key!==key)
    setData(FilterData);

  }
  

  const renderItem = ({ item }) => (
    <View style={{ marginTop:5,marginLeft:40 }}>
      <Text>Bill            Percentage            Tip           Total bill</Text>
     <View style={{flexDirection:'row'}}>
        <Text style={{marginTop:10,marginRight:10}}>{item.Bill}                {item.Percentage}                       {item.TipAmount}                {item.Total_Bill}</Text>
        <TouchableOpacity style={{marginLeft:40, backgroundColor: 'teal',marginLeft:10, borderRadius: 100,
         width: 80, height: 30, justifyContent: 'center', alignItems: 'center' }}
         onPress={()=>DeleteItem(item.key)}
         >
          <Text style={{fontSize:13,fontWeight:'bold',color:'white'}}> Delete</Text></TouchableOpacity>
      </View>
     </View>
  );


  return (
    <View  >
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100,marginBottom:20 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Tip Calculator</Text>
      </View>
      <View>
        <TextInputFeild pholder={'Enter Bill $50'} value={bill} onchange={text => setBill(text)}></TextInputFeild>

      </View>
      <View>
        <TextInputFeild pholder={'Enter Percentage 20%'} value={percentage} onchange={text => setPercentage(text)}></TextInputFeild>

      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 20, paddingTop: 20, fontWeight: 'bold' }}> $5</Text>
      </View>
      <View style={{ marginTop:10,flexDirection: 'row',justifyContent:'center',alignItems:'center' }}>
        <View>
          <MyButton OnPressFn={CalculateTotal} Title={'Calculate'}></MyButton>
        </View>
        <View>
          <MyButton OnPressFn={() => { AddData()}} Title={'Save'}></MyButton>
        </View>

      </View>
      <View>
        <FlatList data={DATA} renderItem={renderItem}></FlatList>
      </View>

    </View>
  );
}

export default App;


const TextInputFeild = ({ pholder, value, onchange }) => {
  return (
    <View>
      <TextInput
        style={{
          fontSize: 18, borderRadius: 10, borderWidth: 2,
          height: 50, marginLeft: 40, marginRight: 40, marginTop: 10,
          paddingLeft: 20
        }}
        value={value}
        keyboardType='numeric'

        onChangeText={onchange}
        placeholder={pholder}
      ></TextInput>
    </View>

  );
}

const MyButton = ({ OnPressFn, Title, }) => {
  return (
    <TouchableOpacity style={{
      backgroundColor: 'teal',
      borderRadius: 100,
      height: 40,
      width: 100,
      marginLeft: 10,
      justifyContent: 'center', alignItems: 'center'
    }}
      onPress={OnPressFn}>
      <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}> {Title}</Text>
    </TouchableOpacity>
  )
}