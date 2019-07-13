import React from 'react'
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import '../../assets/css/InputCustom.css';
import { i18next } from '../../../actions/i18n';

class AutoCompleteInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: props.value };
        this.address = props.value
    }

    handleChange = address => {
        this.setState({ address });
        this.props.onChange(address)
    };

    handleSelect = async address => {
        await geocodeByAddress(address)
            .then(async results => {
                console.log(results)
                await getLatLng(results[0])
                    .then(latLng => {
                        console.log(latLng)
                        this.props.handleSelect(address, latLng)
                    })
            })
            .catch(error => console.error('Error', error));
        this.address = address
        this.setState({ address })
    };

    handleBlur = async() => {
        if (this.state.address !== "") await this.handleSelect(this.address)
    }

    render() {
        const options = { componentRestrictions: { country: "VN" } }
        const renderSuggestion = ({ suggestion }) => (<div className="suggestAdress"><i className="zmdi zmdi-pin" />{suggestion}</div>)
        const onError = (status, clearSuggestions) => {
            console.log('Google Maps API returned error with status: ', status)
            clearSuggestions()
        }

        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
                searchOptions={options}
                onError={onError}
                shouldFetchSuggestions={this.state.address.length >= 2}
                renderSuggestion={renderSuggestion}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
                    var seft = this;
                    return (
                        <div>
                            <input
                                {...getInputProps({
                                    placeholder: seft.props.placeholder,
                                    className: 'input-tabs',
                                    onBlur: function () {
                                        seft.handleBlur()
                                    }
                                })}
                            />
                            <div className= {suggestions.length > 0 ?"autocomplete-dropdown-container nborder" : "autocomplete-dropdown-container wborder"}>
                                {loading && <div>{i18next.t("common:loading")}</div>}
                                {suggestions.map(suggestion => {
                                    const className = suggestion.active
                                        ? 'suggestion-item--active'
                                        : 'suggestion-item';
                                    // inline style for demonstration purpose
                                    const style = suggestion.active
                                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                    return (
                                        <div
                                            {...getSuggestionItemProps(suggestion, {
                                                className,
                                                style,
                                            })}
                                        >
                                            <i className="zmdi zmdi-pin" />
                                            <span>{suggestion.description}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )
                }}
            </PlacesAutocomplete>
        )
    }
}

export default AutoCompleteInput;