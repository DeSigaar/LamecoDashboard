import React from	'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Dropdown extends React.Component {
  state = {
    selectedOption: '',
  }
  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
		if (selectedOption) {
    console.log(`Selected: ${selectedOption.label}`);
		};
  }
  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <Select className='dropdown'
        name="form-field-name"
        value={value}
        onChange={this.handleChange}
        options={[
          { value: 'one', label: 'One' },
          { value: 'two', label: 'Two' },
					{ value: 'three', label: 'Three' },
        ]}
      />
    );
  }
}

export default Dropdown;