import React, { Component } from "react";
import { TouchableOpacity, FlatList, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { BASE_URL } from '../constants/generalConstants';
import {styles} from '../styles/PagStyles';
import { Card } from 'react-native-elements'

class ContentList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lists: [],
      pageInfo: [],
      isLoading: false,
    };
  }
  componentWillMount(){
    const { option } = this.props.navigation.state.params
    this.setState({ pageInfo: option })
  }

  componentDidMount() {
    this.fetchData();
    // Used to change the header title dynamically.
    const title = this.state.pageInfo.option
    this.props.navigation.setParams({title: title})
  }

  fetchData = async () => {
    this.setState({isLoading: true});
    const endpoint = this.state.pageInfo.endpoint
    const response = await fetch(`${BASE_URL}${endpoint}`);
    const json = await response.json();
    this.setState({ lists: json.results });
    this.setState({isLoading: false});
  };

  _renderItem = ({item}) => {
    return  (
      <Card containerStyle={{width: 1000, marginLeft: 0}}>
          <TouchableOpacity onPress={()=>this._onItemPress(item)} style={styles.buttons}>
          <View style={{marginTop:-70}}>
            <Text style={styles.contentCardTitle}>
                {item.name}{'\n'}{'\n'}
            </Text>
          </View>
            <View style={{marginTop:70,marginLeft:-200}}>
            </View>
      </TouchableOpacity>
    </Card>
    )
  }

  _onItemPress = (item) => {
    this.props.navigation.navigate(this.state.pageInfo.detailScreen,
      { detailArg : { item : item, pageInfo : this.state.pageInfo } })
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title', 'Options Available'),
      headerStyle: {
        backgroundColor: '#8D6AB1',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 30,
      },
    };
  };

  _renderContext(){
    if(this.state.isLoading == true){
      return (
          <ActivityIndicator size="large" color="#0000ff" />
      )
    }else{
      return (
        <FlatList
          data={this.state.lists}
          renderItem={this._renderItem}
          keyExtractor = { (item, index) => index.toString() }
          ItemSeparatorComponent={()=>
          <View style={styles.separator} />
          }/>
      )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this._renderContext()}
      </View>
    );
  }
}

export default ContentList;
