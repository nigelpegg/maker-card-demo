import ModelBoundComponent from './components/boundUI/ModelBoundComponent';
import BoundContentEditable from './components/boundUI/BoundContentEditable';

export default class MakerCard extends ModelBoundComponent {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div {...this.props} className="maker-card">
                <BoundContentEditable
                            tag="h2" placeholder="Your name"
                            editable={this.props.editable}
                            model={this.props.profile} propertyName="name" />
                I Make <BoundContentEditable
                            tag="span" placeholder="Awesome stuff"
                            editable={this.props.editable}
                            model={this.props.profile} propertyName="imake"/>
            </div>
        );
    }
}
