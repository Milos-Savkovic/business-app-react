import React, { Component } from 'react';
import { fireDB } from '../api/firebaseApp';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ReportDetails.css';
import { ReportTable } from './ReportTable';

class ReportDetails extends Component {
  state = {
    user: null
  }
  componentWillMount() {
    fireDB.ref('/users').once('value')
      .then((snapshot) => {
        const Team = [
          ...snapshot.val(),
        ];
        Team.filter(item => item.Id === this.props.id)
          .map(item => (
            this.setState({
              user: item,
            })
          ))
        console.log(this.state.user);
      })
      .catch((e) => console.log(e))
  }
  printReport = () => {
    const page1 = document.getElementById('report-page-2');
    // divToPrint.setAttribute('class', 'report-container-print');
    html2canvas(page1)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        pdf.addImage(imgData, 'JPEG', 0, 0);
        const report = this.giveMeReport();
        pdf.save(`${report.reportName}.pdf`);
        // divToPrint.setAttribute('class', 'report-container-print');
      })
      .catch(err => console.log(err))
      ;

  }
  giveMeReport = () => {
    const arrayFromUrl = this.props.path.split('/');
    const repName = arrayFromUrl.pop();
    const date = arrayFromUrl.pop();
    const reportArr = this.state.user.Reports.filter(rep => rep.reportName === repName && rep.date1 === date);
    const reportObj = reportArr.pop();
    return reportObj;
  }
  render() {

    if (this.state.user) {
      const report = this.giveMeReport();
      return (
        <div>
          <div className="report-container" id="report">
            <div className="right-border-report" id="report-page-1">
              <h4>Preduzeće - Organizacija</h4>
              <div className="report-row">
                <div><strong>"GotSolution" d.o.o. Banja Luka</strong></div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field" style={{ paddingRight: '1rem' }}>
                  <span className="report-text">Broj:</span>
                  <div className="floor-border"></div>
                </div>
                <div className="report-field">
                  <span className="report-text">Datum:</span>
                  <div className="floor-border">{report.date1}</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Ime i Prezime</span>
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Raspoređen-na na poslove radnog mesta</span>
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">sa dnevnicom (domaćom ili stranom)</span>
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Vrsta u iznosu</span>
                  <div className="floor-border floor-border--end">KM&nbsp;</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">otputovaće po službenom poslu u mjesto-a</span>
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <br />
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">radi</span>
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Putovanje će trajati</span>
                  <div className="floor-border" style={{ width: '8rem' }}></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Troškovi putovanje padaju na teret</span>
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Na službenom putu će koristiti prevozno sredstvo</span>
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <br />
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Pravac putovanja</span>
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text">Na službenom putu će se zadržati najdalje do: </span>
                  <div className="floor-border"></div>
                  <span className="report-text"> godine.&nbsp;</span>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text" style={{ whiteSpace: 'inherit' }}>
                    a u roku od 48 časova po povratku sa službenog puta i dolaska na posao, podneće pismeni izveštaj o obavljenom poslu. Račun o učinjenim putnim troškovima podneti u roku od sedam dana.
                </span>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text" style={{ paddingRight: '1rem' }}>Putni troškovi padaju na teret </span>
                  <div className="floor-border floor-border--start">Kompanije</div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <br />
                  <div className="floor-border"></div>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text" style={{ paddingRight: '1rem' }}>Odobravam isplatu akontacije u iznosu od KM</span>
                  <div className="floor-border floor-border--start">0,00</div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <div className="paraf-bottom">
                <div className="report-row-no-line">
                  <div className="report-field report-field--end">
                    <span className="report-text report-text--right-padding">Nalogodavac,</span>
                  </div>
                </div>
                <br />
                <br />
                <div className="report-row-no-line report-row-no-line--no-margin">
                  <div className="report-field report-field--end">
                    <div className="floor-border" style={{ width: '12rem', marginRight: '1rem' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="no-right-border-report" id="report-page-2">
              <h4 className="text-center">Na osnovu prednjeg naloga izvršio sam službeno putovanje i podnosim sledeći</h4>
              <h2 className="text-center">PUTNI NALOG</h2>
              <ReportTable />
              <br />
              <br />
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text" style={{ whiteSpace: 'inherit', fontSize: '1.3rem' }}>
                    Potvrđujem da je putovanje izvršeno prema ovom nalogu i odobravam uplatu
                  </span>
                </div>
              </div>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text" style={{ whiteSpace: 'inherit', fontSize: '1.3rem' }}>
                    putnog računa od KM
                  </span>&nbsp;&nbsp;&nbsp;
                  <div className="floor-border" style={{ width: '8rem' }}></div>
                </div>
              </div>
              <br />
              <div className="report-row-no-line">
                <div className="report-field">
                  <div className="floor-border floor-border--start"></div>
                  <span className="report-text" style={{ paddingRight: '1rem' }}>na teret</span>
                  <div className="floor-border floor-border--center">kompanije</div>
                </div>
              </div>
              <br/>
              <div className="report-row-no-line">
                <div className="report-field">
                  <span className="report-text" style={{ paddingRight: '1rem' }}>U</span>
                  <div className="floor-border floor-border--center" style={{width: '12rem'}}>Banjoj Luci</div>
                  <span className="report-text" style={{ paddingRight: '1rem' }}>dana</span>
                  <div className="floor-border floor-border--center" style={{width: '12rem'}}></div>
                </div>
              </div>
              <br />
              <br />
              <br />
              <br />
              <div className="paraf-bottom">
                <div className="report-row-no-line">
                  <div className="report-field report-field--end">
                    <span className="report-text report-text--right-padding">Nalogodavac,</span>
                  </div>
                </div>
                <br />
                <br />
                <div className="report-row-no-line report-row-no-line--no-margin">
                  <div className="report-field report-field--end">
                    <div className="floor-border" style={{ width: '12rem', marginRight: '1rem' }}></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <button
            className="print-report-button"
            onClick={this.printReport}
          >
            Print report &#128438;
          </button>
          <br />
        </div>

      );
    } else {
      return (
        <div className="load-bar">
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      );
    }
  }
}

export default ReportDetails;