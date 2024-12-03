import * as React from 'react';
import styles from './ClaringtonQrCodeGenerator.module.scss';
import type { IClaringtonQrCodeGeneratorProps } from './IClaringtonQrCodeGeneratorProps';
import { PrimaryButton, TextField } from '@fluentui/react';
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
      marginRight: 'auto',
      marginTop: '5px'
    };

    const QR_CODE = React.createRef<QRCode>();
    // const pdfExportComponent = React.createRef<PDFExport>();

    return (
      <section className={`${styles.claringtonQrCodeGenerator}`} style={{ maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto' }}>
        <div className={styles.welcome}>
          <h2>Clarington QR Codes</h2>
        </div>
        <div>
          <TextField label="Convert URL to QR Code" placeholder='https://claringtonnet.sharepoint.com/' onChange={(e, newValue) => this.setState({ userInput: newValue })} />
          <div>
            {
              this.state?.userInput &&
              <div style={centerDivStyles}>
                <PrimaryButton
                  style={{ width: '100%' }}
                  text="Export As"
                  iconProps={{ iconName: 'Export' }}
                  menuProps={{
                    items: [
                      {
                        key: 'exportImage',
                        text: 'PNG',
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
                      // {
                      //   key: 'exportPDF',
                      //   text: 'PDF',
                      //   iconProps: { iconName: 'PDF' },
                      //   onClick: (e, item) => {
                      //     if (!QR_CODE.current) {
                      //       alert('Failed to export to PDF');
                      //       return;
                      //     }
                      //     if (pdfExportComponent.current) {
                      //       pdfExportComponent.current.save();
                      //     } else {
                      //       alert('Failed to export to PDF');
                      //       return;
                      //     }
                      //   },
                      // },
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
                    ],
                    directionalHintFixed: true,
                  }}
                />
                {/* <PDFExport
                  ref={pdfExportComponent}
                  paperSize="auto"
                  margin={40}
                  fileName={`Clarington QR Code`}
                  author="Clarington QR Code App"
                > */}
                  <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                    <QRCode
                      ref={QR_CODE}
                      value={this.state.userInput}
                      errorCorrection="L"
                      size={300}
                      border={{
                        color: '#005a93',
                        width: 3
                      }} />
                  </div>
                {/* </PDFExport> */}
              </div>
            }
          </div>
        </div>
      </section>
    );
  }
}
