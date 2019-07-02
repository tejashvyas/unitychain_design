import React from 'react';
import { Row, Typography, Select } from 'antd';
import {
	MyUploadsComponent,
	MediaComponent,
	DocumentsComponent,
} from '../../components/pesonalfiles';

const { Title } = Typography;
const { Option } = Select;

class PersonalFilesPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			MyUploads: 'MyUploads',
		};
		

		

		this.onChangePersonalFiles = this.onChangePersonalFiles.bind(this);
		
	}

	onChangePersonalFiles = value => {
		this.setState({ MyUploads: value });
	};

	render() {
		const { MyUploads } = this.state;

		return (
			<div className="main">
				<div className="section p-0">
					<div className={`slide_animation ${this.props.toggleUrl ? 'slideInUp' : 'slideInDown'} animated`}>
						<Row type="flex" justify="space-between" className="slide_animation slideInUp animated">
							<Row type="flex">
								<Title className="title">App Overview</Title>
								<Select
									name="MyUploads"
									className="title_menu"
									onChange={this.onChangePersonalFiles}
									value={MyUploads}
								>
									<Option value="MyUploads">My Uploads</Option>
									<Option value="media">Media</Option>
									<Option value="documents">Documents</Option>
								</Select>
							</Row>
							
						</Row>

						{MyUploads == 'MyUploads' && <MyUploadsComponent />}
						{MyUploads == 'media' && <MediaComponent />}
						{MyUploads == 'documents' && <DocumentsComponent />}
					</div>
				</div>
			</div>
		);
	}
}

export default PersonalFilesPage;
