import Taro,{Component, createAudioContext} from '@tarojs/taro'
import {View,Text,Picker} from '@tarojs/components'

import city from './city.js'
import './citypicker.less'

export default class CityPicker extends Component {

  constructor(props){
    super(props);

    this.state = {
      selector: [],
      selectedArea: '广东省广州市市辖区',
      columnRecord:'18',
      defaultArea:["18","0","0"]
    }
  }
  
  componentWillMount(){
    let provinces=[];
    let tmpCities=this.getCity(18);
    let tmpAreas=this.getArea(18,0);
    city.forEach((item,index)=>{
      provinces[index]=item.name;
    })
    this.setState({
      selector:[provinces,tmpCities,tmpAreas]
    })
    
  }

  onColumnchange=e=>{
    let cities=[];
    switch(e.detail.column)
    {
      case 0:
        this.setState({
          columnRecord:e.detail.value
        })
        this.getCity(e.detail.value);
        this.getArea(e.detail.value,0);
        break;
      case 1:
        this.getArea(this.state.columnRecord,e.detail.value);
    }
    
  }

  onChange(e){
    let selectedArea='';
    let first=e.detail.value[0];
    let sec=e.detail.value[1];
    let third=e.detail.value[2];
    let info=city[first].sub[sec].sub[third];
    selectedArea=city[first].name+city[first].sub[sec].name+city[first].sub[sec].sub[third].name;
    this.setState({
      selectedArea:selectedArea
    })
    
  }

  getCity(provinces_index){
    let cities=[];
    city[provinces_index].sub.forEach((item,index)=>{
      cities[index]=item.name;
    })
    let tempSelector=this.state.selector;
    tempSelector[1]=cities;
    this.setState({
      selector:tempSelector
    })
    return cities;
  }

  getArea(provinces_index,cities_index){
    let areas=[];
    city[provinces_index].sub[cities_index].sub.forEach((item,index)=>{
      areas[index]=item.name;
    })
    let tempSelector=this.state.selector;
    tempSelector[2]=areas;
    this.setState({
      selector:tempSelector
    })
    return areas;
  }

  render () {
    return (
      <View className='container'>
        <View className='picker-body'>
          <View className='picker-section disFlex Flex-middle'>
            <Text className="picker-tip">所在地区</Text>
            <View>
              <Picker mode='multiSelector' value={this.state.defaultArea} range={this.state.selector} onChange={this.onChange.bind(this)} onColumnchange={this.onColumnchange.bind(this)}>
                <View className='picker-area disFlex'>
                  {this.state.selectedArea}
                </View>
              </Picker>
            </View>
          </View>
          
          
        </View>
      </View>
    )
  }
}