import * as React from 'react';
import styles from './ClaringtonQrCodeGenerator.module.scss';
import type { IClaringtonQrCodeGeneratorProps } from './IClaringtonQrCodeGeneratorProps';
import { IButtonProps, PrimaryButton, TextField } from '@fluentui/react';
import { QRCode } from '@progress/kendo-react-barcodes';
import { saveAs } from '@progress/kendo-file-saver';

export interface IClaringtonQrCodeGeneratorState {
  userInput?: string;
}

export default class ClaringtonQrCodeGenerator extends React.Component<IClaringtonQrCodeGeneratorProps, IClaringtonQrCodeGeneratorState> {
  public render(): React.ReactElement<IClaringtonQrCodeGeneratorProps> {
    const centerDivStyles: React.CSSProperties = {
      maxWidth: 'fit-content',
      marginLeft: 'auto',
      marginRight: 'auto'
    };

    const QR_CODE = React.createRef<QRCode>();

    return (
      <section className={`${styles.claringtonQrCodeGenerator}`}>
        <div className={styles.welcome}>
          <h2>Clarington QR Code Generator</h2>
        </div>
        <div>
          <TextField label="Convert URL to QR Code" placeholder='https://claringtonnet.sharepoint.com/' onChange={(e, newValue) => this.setState({ userInput: newValue })} />
          <div>
            {
              this.state?.userInput &&
              <div style={centerDivStyles}>
                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                  <QRCode
                    ref={QR_CODE}
                    value={this.state.userInput}
                    errorCorrection="L"
                    size={300}
                    border={{
                      color: '#005a93',
                      width: 2
                    }} />
                </div>
                <PrimaryButton
                  style={{ width: '100%' }}
                  text="Export As"
                  iconProps={{ iconName: 'Export' }}
                  menuProps={{
                    items: [
                      {
                        key: 'exportImage',
                        text: 'Image',
                        iconProps: { iconName: 'FileImage' },
                        onClick: (e, item) => {
                          if (!QR_CODE.current) {
                            alert('Failed to export as image');
                            return;
                          }
                          QR_CODE.current.exportImage().then((dataURI: any) => {
                            saveAs(dataURI, 'Clarington_QRCode.png');
                          });
                        }
                      },
                      {
                        key: 'exportSVG',
                        text: 'SVG',
                        iconProps: { iconName: 'Emoji2' },
                        onClick: (e, item) => {
                          if (!QR_CODE.current) {
                            alert('Failed to export as SVG');
                            return;
                          }
                          QR_CODE.current.exportSVG().then((dataURI: any) => {
                            saveAs(dataURI, 'Clarington_QRCode.svg');
                          });
                        }
                      },
                      {
                        key: 'exportPDF',
                        text: 'PDF',
                        iconProps: { iconName: 'PDF' },
                        onClick: (e, item) => {
                          if (!QR_CODE.current) {
                            alert('Failed to export as PDF');
                            return;
                          }
                          
                        }
                      },
                    ],
                    directionalHintFixed: true,
                  }}
                  // Optional callback to do other actions (besides opening the menu) on click
                  onMenuClick={(ev, button: IButtonProps) => {
                    console.log('OnMenuClick', button);
                  }}
                />
              </div>
            }
          </div>
        </div>
      </section>
    );
  }
}
