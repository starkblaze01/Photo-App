import {Button} from 'antd';
import { useHistory } from 'react-router-dom';
function Upload(props) {
    const history = useHistory();
    const onClick = (path) => {
        history.push(path)
    }

    console.log();
    return (
        <div style={{display: 'flex', justifyContent:'space-between', maxWidth:'500px', margin: '20% auto'}}>
            <Button
                danger="true"
                shape="round"
                size='large'
                onClick={() =>{onClick('upload'); props.changeSelectedKeys('2');}}
            >
                Upload Images
            </Button>
            <Button
                style={{
                    color: '#1890ff',
                    borderColor: '#1890ff',
                }}
                shape="round"
                size='large'
                onClick={() => {onClick('view'); props.changeSelectedKeys('3');}}
            >
                View Images
            </Button>
        </div>
    )
}

export default Upload;