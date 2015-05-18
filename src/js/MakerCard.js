import ModelBoundComponent from './ModelBoundComponent';
import ContentEditable from './ContentEditable';

export default class MakerCard extends ModelBoundComponent {
    constructor(props) {
        super(props);
        var profile = this.props.profile;
        this.bindStateToModel(profile, ['name', 'imake']);
    }

    render() {
        return (
            <div {...this.props} className="maker-card">
                <h2 contentEditable={this.props.editable}>
                    { this.state.name }
                </h2>
                I Make <ContentEditable tag="span" editable={this.props.editable} html={this.state.imake}/>
            </div>
        );
    }

}
