import React from "react";
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableHighlight,
    Image,
    Platform
} from "react-native";
import axios from "axios";
import { AntDesign as Icon } from "@expo/vector-icons";

const isIOS = Platform.OS === "ios";

class ListScreen extends React.Component {
    static navigationOptions = {
        title: "Contacts",
        headerStyle: {
            backgroundColor: "#2a3daa"
        },
        headerTintColor: "#FFF"
    };

    constructor(props) {
        super(props);

        this.state = { contacts: [], loading: false };

        this.onPress = this.onPress.bind(this);
        this.renderItem = this.renderItem.bind(this);
        this.getData = this.getData.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        this.getData();
    }

    getData() {
        axios.get("https://robocontacts.herokuapp.com/api/contacts?random").then(({ data }) => {
            console.log(data);
            this.setState({ contacts: data, loading: false });
        });
    }

    renderItem({ item }) {
        return (
            <View style={styles.contactContainer}>
                <TouchableHighlight
                    style={styles.contactHighlight}
                    underlayColor={"#E4E4E4"}
                    onPress={() => this.onPress(item)}
                >
                    <View style={styles.contactRow}>
                        <Image style={styles.avatar} source={{ uri: item.picture }} />
                        <View>
                            <Text style={styles.contacts}>{item.name}</Text>
                            <Text style={styles.contactCompany}>{item.company}</Text>
                        </View>
                        <View style={styles.chevronContainer}>
                            {isIOS ? <Icon name="right" size={16} color="#DDD" /> : null}
                        </View>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }

    renderSeparator() {
        const style = { height: 1, backgroundColor: "#DDD", marginLeft: 10 };
        return <View style={style} />;
    }

    keyExtractor(item, index) {
        return `${index}`;
    }

    onPress(item) {
        this.props.navigation.navigate("Details", { contact: item });
    }

    refreshData() {
        this.setState({ loading: true });
        this.getData();
    }

    render() {
        const { contacts, loading } = this.state;
        return (
            <FlatList
                data={contacts}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                ItemSeparatorComponent={this.renderSeparator}
                onRefresh={this.refreshData}
                refreshing={loading}
            />
        );
    }
}

export default ListScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    contactContainer: {
        height: 50,
        paddingHorizontal: 10,
        fontSize: 18,
        justifyContent: "center"
    },
    contacts: {
        fontSize: 18
    },
    contactHighlight: {
        backgroundColor: "#FFF"
    },
    contactCompany: {
        fontSize: 10,
        color: "#AAA"
    },
    avatar: {
        height: 30,
        width: 30,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#DDD",
        marginRight: 5
    },
    contactRow: {
        flexDirection: "row",
        alignItems: "center"
    },
    chevronContainer: {
        flex: 1,
        alignItems: "flex-end",
        paddingRight: 10
    }
});
