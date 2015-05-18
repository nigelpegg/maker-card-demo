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
                <ContentEditable tag="h2"
                                 editable={this.props.editable}
                                 html={this.state.name}
                                 onBlur={(p_evt)=>{this.onNameCommit(p_evt)}} />
                I Make <ContentEditable tag="span"
                                        editable={this.props.editable}
                                        html={this.state.imake}
                                        onBlur={(p_evt)=>{this.onIMakeCommit(p_evt)}}
                />
            </div>
        );
    }

    onIMakeCommit(p_evt)
    {
        this.props.profile.setProperty('imake', p_evt.value);
    }

    onNameCommit(p_evt)
    {
        this.props.profile.setProperty('name', p_evt.value);
    }
}
