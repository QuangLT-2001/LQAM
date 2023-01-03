import ButtonComponent from 'components/button';
import { Modal } from 'rsuite';

const ModalComponent: React.FC<any> = (props) => {
  return (
    <>
      <Modal open={props.open} onClose={props.handleClickCancel}>
        <Modal.Header className="p-3" style={{ background: 'rgb(243 243 243)' }}>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-3">{props.body()}</Modal.Body>
        <Modal.Footer className="p-3 border-top border-secondary">
          <ButtonComponent
            name="OK"
            appearance="primary"
            className="me-3 ps-4 pe-4"
            color="green"
            onClick={props.handleClickOK}
          />
          <ButtonComponent name="Hủy" appearance="default" onClick={props.handleClickCancel} />
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalComponent;
