import React, { Component } from 'react';
import { fireDB } from './firebaseApp';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ReportDetails.css';

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
    const divToPrint = document.getElementById('report');
    divToPrint.setAttribute('class', 'report-container-print');
    html2canvas(divToPrint)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(imgData, 'JPEG', 0, 0);
        const report = this.giveMeReport();
        pdf.save(`${report.reportName}.pdf`);
        divToPrint.setAttribute('class', 'report-container');
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
            <div className="rightBorder">
              {/*<h4 className="report-user">{`${this.state.user.FirstName} ${this.state.user.LastName}`}</h4>
            <h2 className="report-name">{report.reportName}</h2>
            <div className="report-row"><strong>Report Name: </strong><i>{report.reportName}</i></div>
            <div className="report-row"><strong>Daily Earnings: </strong><i>{report.dailyEarnings}</i></div>
            <div className="report-row"><strong>Type of transport: </strong><i>{report.typeOfTransport}</i></div>
            <div className="report-row"><strong>Distance: </strong><i>{report.distance}</i></div>
            <div className="report-row"><strong>Start: </strong><i>{report.date1}</i></div>
            <div className="report-row"><strong>End: </strong><i>{report.date2}</i></div>
            <div className="report-row"><strong>Costs: </strong><i>{report.costs}</i></div>*/}
              <h5>Preduzeće - Organizacija</h5>
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
                  <div className="floor-border"></div>
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
                  <span className="report-text" style={{ paddingRight: '1rem' }}>Putni troškovi padaju na teret </span>
                  <div className="floor-border floor-border--start">0,00</div>
                </div>
              </div>
              <br />
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
          <button
            className="printReportBtn"
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