import * as React from 'react';
import styles from './ClaringtonQrCodeGenerator.module.scss';
import type { IClaringtonQrCodeGeneratorProps } from './IClaringtonQrCodeGeneratorProps';
import { PrimaryButton, TextField } from '@fluentui/react';
import { QRCode } from '@progress/kendo-react-barcodes';

export interface IClaringtonQrCodeGeneratorState {
  userInput?: string;
}

export default class ClaringtonQrCodeGenerator extends React.Component<IClaringtonQrCodeGeneratorProps, IClaringtonQrCodeGeneratorState> {
  public render(): React.ReactElement<IClaringtonQrCodeGeneratorProps> {
    const {
      hasTeamsContext,
    } = this.props;

    const centerDivStyles: React.CSSProperties = {
      maxWidth: 'fit-content',
      marginLeft: 'auto',
      marginRight: 'auto'
    };

    const printID = 'PrintThis';

    const _printPage = (): void => {
      const element = document.getElementById(printID);
      const printContent = element?.innerHTML;
      const originalContent = window.document.body.innerHTML;

      if (printContent) {
        window.document.body.innerHTML = printContent;
        window.print();
        window.document.body.innerHTML = originalContent;
      }
      else {
        alert('Failed to Print QR Code.');
      }
    }

    return (
      <section className={`${styles.claringtonQrCodeGenerator} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <h2>Clarington QR Code Generator</h2>
        </div>
        <div>
          <TextField label="Convert URL to QR Code" placeholder='https://claringtonnet.sharepoint.com/' onChange={(e, newValue) => this.setState({ userInput: newValue })} />
          <div>
            {
              this.state?.userInput &&
              <div style={centerDivStyles}>
                <div id={printID} style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <QRCode
                    value={this.state.userInput}
                    errorCorrection="L"
                    size={300}
                    border={{
                      color: '#005a93',
                      width: 2
                    }} />
                </div>
                <PrimaryButton style={{ width: '100%' }} iconProps={{ iconName: 'Print' }} text="Export to PDF" onClick={_printPage} />
              </div>
            }
          </div>
        </div>
      </section>
    );
  }
}
