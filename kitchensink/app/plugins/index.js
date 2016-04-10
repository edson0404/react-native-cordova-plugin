import React, {
    Component,
    ListView,
    Text,
    View,
    TouchableHighlight,
    StyleSheet,
    ToastAndroid
} from 'react-native';

var Icon = require('react-native-vector-icons/Ionicons');

const plugins = [
    { id: 'cordova-plugin-camera', name: 'Camera', module: require('./camera').default },
    { id: 'cordova-plugin-contacts', name: 'Contacts', module: require('./contacts').default }
];

function findPlugin(pluginId) {
    let plugin = plugins.filter((plugin) => plugin.id === pluginId);
    if (plugin.length !== 1) {
        ToastAndroid.show('Could not find plugin ' + pluginId, ToastAndroid.SHORT);
    } else {
        return plugin[0];
    }
}

export default class PluginList extends Component {
    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: ds.cloneWithRows(plugins),
        }
    }

    renderRow(plugin) {
        return (
            <View>
                <TouchableHighlight onPress={(e) => this.props.onSelect(findPlugin(plugin.id)) }>
                    <View style={styles.row}>
                        <View style={styles.iconContent}>
                            <Icon name={plugin.icon || 'android-' + plugin.name.toLowerCase() } size={20} style={styles.icon}/>
                        </View>
                        <View style={styles.textContent}>
                            <Text style={styles.rowTitleText}>{plugin.name}</Text>
                            <Text style={styles.rowDetailText}>{plugin.id}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.separator} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.listContainer}>
                <ListView
                    style={styles.listView}
                    dataSource={this.state.dataSource}
                    renderRow={(row) => this.renderRow(row) }
                    />
            </View>
        );
    }
}

export {plugins};

styles = StyleSheet.create({
    listContainer: {
        flex: 1,
    },
    list: {
        backgroundColor: '#eeeeee',
    },
    row: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    textContent: {
        alignSelf: 'center',
    },
    iconContent: {
        alignSelf: 'center',
    },
    icon: {
        textAlign: 'center',
        marginRight: 20,
        width: 20,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#bbbbbb',
    },
    rowTitleText: {
        fontSize: 17,
        fontWeight: '500',
    },
    rowDetailText: {
        fontSize: 15,
        color: '#888888',
        lineHeight: 20,
    },
});