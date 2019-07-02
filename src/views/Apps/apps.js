import React from 'react';
import { Row, Typography, Select } from 'antd';
import { MySocialComponent } from '../../components/apps';

const { Title } = Typography;
const { Option } = Select;

class AppsPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			apps: 'mySocial',
			importData: false,
		};
		
		this.onChangeApps = this.onChangeApps.bind(this);
		this.onChangeImportData = this.onChangeImportData.bind(this);
	}

	onChangeApps = value => {
		this.setState({ apps: value });
	};

	onChangeImportData = () => {
		this.setState({ importData: !this.state.importData });
	};

	render() {
		const { apps, importData } = this.state;

		return (
			<div className="main">
				<div className="section p-0">
					<div className={`slide_animation ${this.props.toggleUrl ? 'slideInUp' : 'slideInDown'} animated`}>
						<Row type="flex" justify="space-between" className="slide_animation slideInUp animated">
							<Row type="flex">
								<Title className="title">App Overview</Title>
								<Select name="apps" className="title_menu" onChange={this.onChangeApps} value={apps}>
									<Option value="mySocial">My Social</Option>
								</Select>
							</Row>
						</Row>
						<MySocialComponent />
					</div>
				</div>
			</div>
		);
	}
}

export default AppsPage;
