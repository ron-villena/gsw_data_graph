import React, {useState, useEffect}  from 'react';
import './App.css';

import gsw_logo from './gsw_logo.png';
import big_three from './big_three.jpg';

function App() {
  const [infoPlayers, setInfoPlayers] = useState([]);
  const [searchYear, setSearchYear] = useState(0);
  const [cbStats, setCbStats] = useState({
    'points': true,
    'rebounds': false,
    'assists': false,
  })

  function doFetch() {
    console.log('cbPoints:', cbStats.points, '; cbRebounds:', cbStats.rebounds, ' cbAssits:', cbStats.assists);
    console.log('calling the doFetch method!!!!');
    const url = `https://www.balldontlie.io/api/v1/season_averages?season=${searchYear}&player_ids[]=115&player_ids[]=443&player_ids[]=185`;
    console.log('url is:',url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('Data:', data.data);
        setInfoPlayers(data.data);
      })
  }

  function onSelectChange (ev) {
    const value = ev.target.value;
    console.log('Select Value is', value);
    setSearchYear(value);
    console.log('Search Year is:', searchYear);
  }

  function onCheckboxChange(ev) {
    const name = ev.target.name;
    console.log('Name is', name);
    const value = cbStats[name];
    console.log('Value is', value);
    setCbStats({
      ...cbStats,
      [name]: !cbStats[name],
    })
  }

  function getWidth() {
    const cbArr = Object.values(cbStats);
    console.log(cbArr);
    let count = 0;
    cbArr.forEach(val => {
      if (val) {
        console.log(val);
        count++;
      }
    });
    console.log("# of True's", count);
    return 100 / count;
  }

  useEffect(doFetch, [searchYear, cbStats]);

  return (
    <div class="container">
      <nav class="nav">
        <div class="nav__title">
          <img src={gsw_logo} class="nav__title--logo" />
          <h1 id="title" class="nav__title--header">Golden State Warriors - Big Three</h1>
          <img src={big_three} class="nav__title--big3" />
        </div>
        <div class="nav__controls">
          <select id='year' class="controls__controls--select" onChange={onSelectChange}>
            <option value="" disabled selected hidden>Please Choose...</option>
            <option value='2009'>2009</option>
            <option value='2010'>2010</option>
            <option value='2011'>2011</option>
            <option value='2012'>2012</option>
            <option value='2013'>2013</option>
            <option value='2014'>2014</option>
            <option value='2015'>2015</option>
            <option value='2016'>2016</option>
            <option value='2017'>2017</option>
            <option value='2018'>2018</option>
            <option value='2019'>2019</option>
          </select>
          <div class='na__controls--stats'>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked= {cbStats.points}
                  onChange={onCheckboxChange}
                  name="points"
                />
                - Points
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked= {cbStats.rebounds}
                  onChange={onCheckboxChange}
                  name="rebounds"
                />
                - Rebounds
              </label>
            </div>
            <div>
              <label>
                <input
                  type="checkbox"
                  checked= {cbStats.assists}
                  onChange={onCheckboxChange}
                  name="assists"
                />
                - Assists
              </label>
            </div>
          </div>
        </div>
      </nav>
      <div class='chart'>
        {
          infoPlayers.map(infoPlayer => (
            infoPlayer.player_id === 115 ? (
                <div id='divScurry' class="scurry">
                  {
                    cbStats.points ? (
                      <div class='chart__block chart__block--pts' style={{height: infoPlayer.pts * 9 + "px", width: getWidth() + "%"}} >Steph Curry-{infoPlayer.pts}pts/gm</div>
                    ) : null
                  }
                  {
                    cbStats.rebounds ? (
                      <div class='chart__block chart__block--rbs' style={{height: infoPlayer.reb * 9 + "px", width: getWidth() + "%"}} >Steph Curry-{infoPlayer.reb}rbs/gm</div>
                    ) : null
                  }
                  {
                    cbStats.assists ? (
                      <div class='chart__block chart__block--ast' style={{height: infoPlayer.ast * 9 + "px", width: getWidth() + "%"}} >Steph Curry-{infoPlayer.ast}ast/gm</div>
                    ) : null
                  }
                </div> )
            : infoPlayer.player_id === 443 ? (
                <div id='divKthomson' class="kthompson">
                {
                  cbStats.points ? (
                    <div class='chart__block chart__block--pts' style={{height: infoPlayer.pts * 9 + "px", width: getWidth() + "%"}} >Klay Thompson-{infoPlayer.pts}pts/gm</div>
                  ) : null
                }
                {
                  cbStats.rebounds ? (
                    <div class='chart__block chart__block--rbs' style={{height: infoPlayer.reb * 9 + "px", width: getWidth() + "%"}} >Klay Thompson-{infoPlayer.reb}rbs/gm</div>
                  ) : null
                }
                {
                  cbStats.assists ? (
                    <div class='chart__block chart__block--ast' style={{height: infoPlayer.ast * 9 + "px", width: getWidth() + "%"}} >Klay Thompson-{infoPlayer.ast}ast/gm</div>
                  ) : null
                }
                </div> )
            : (
                <div id='divDgreen' class="dgreen">
                {
                  cbStats.points ? (
                    <div class='chart__block chart__block--pts' style={{height: infoPlayer.pts * 9 + "px", width: getWidth() + "%"}} >Draymond Green-{infoPlayer.pts}pts/gm</div>
                  ) : null
                }
                {
                  cbStats.rebounds ? (
                    <div class='chart__block chart__block--rbs' style={{height: infoPlayer.reb * 9 + "px", width: getWidth() + "%"}} >Draymond Green-{infoPlayer.reb}rbs/gm</div>
                  ) : null
                }
                {
                  cbStats.assists ? (
                    <div class='chart__block chart__block--ast' style={{height: infoPlayer.ast * 9 + "px", width: getWidth() + "%"}} >Draymond Green-{infoPlayer.ast}ast/gm</div>
                  ) : null
                }
                </div>
            )
          ))
        }
      </div>
    </div>
  );
}

export default App;
