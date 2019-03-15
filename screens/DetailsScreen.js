import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Image from "react-native-image-progress";
import ProgressBar from "react-native-progress/Bar";
import ProgressCircle from "react-native-progress/Circle";
import ProgressSnail from "react-native-progress/CircleSnail";
import ProgressPie from "react-native-progress/Pie";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { WebBrowser } from "expo";

class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam("contact").name,
        headerStyle: {
            backgroundColor: "#2a3daa"
        },
        headerTintColor: "#FFF",
        headerRight: (
            <TouchableOpacity onPress={navigation.getParam("webButton")} title="film" color="#fff">
                <Icon style={styles.icon} name="web" size={24} color="#FFF" />
            </TouchableOpacity>
        )
    });

    constructor(props) {
        super(props);

        this._webButton = this._webButton.bind(this);
    }

    componentDidMount() {
        this.props.navigation.setParams({ webButton: this._webButton });
    }

    async _webButton() {
        const contact = this.props.navigation.getParam("contact");
        await WebBrowser.openBrowserAsync(contact.filmUrl);
    }

    render() {
        const contact = this.props.navigation.getParam("contact");
        const subjectivePronoun = contact.gender === "male" ? "He" : "She";
        const objectivePronoun = contact.gender === "male" ? "His" : "Her";
        const gender =
            contact.gender.charAt(0).toUpperCase() + contact.gender.substr(1).toLowerCase();
        return (
            <View style={styles.detailsContainer}>
                <Image
                    style={styles.image}
                    source={{ uri: contact.picture }}
                    indicator={ProgressCircle}
                />
                <Text style={styles.detailsText}>
                    {contact.name} is {gender}.
                </Text>
                <Text style={styles.detailsText}>
                    {subjectivePronoun} lives {contact.address}.
                </Text>
                <Text style={styles.detailsText}>
                    {subjectivePronoun} works at {contact.company}.
                </Text>
                <Text style={styles.detailsText}>
                    {objectivePronoun} favourite film is {contact.filmName}.
                </Text>
            </View>
        );
    }
}

export default DetailsScreen;

const styles = StyleSheet.create({
    detailsContainer: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        paddingTop: 20,
        marginHorizontal: 20
    },
    image: {
        height: 200,
        width: 200,
        marginBottom: 10,
        alignSelf: "center"
    },
    detailsText: {
        alignItems: "flex-start",
        fontSize: 18,
        marginVertical: 5
    },
    icon: {
        marginRight: 16
    }
});
