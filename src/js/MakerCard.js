import ModelBoundComponent from './ModelBoundComponent';

export default class MakerCard extends ModelBoundComponent {
    constructor(props) {
        super(props);
        var profile = this.props.profile;
        this.state = {
            test:'test'
        };
        this.bindModelToState(profile, ['name', 'imake']);
    }

    render() {
        return (
            <div {...this.props} className="maker-card">
                <h2>{ this.state.name }</h2>
                I Make <span>{ this.state.imake } {this.state.test}</span>
            </div>
        );
    }

}
