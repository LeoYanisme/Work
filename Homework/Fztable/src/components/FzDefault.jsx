import React, { Component } from "react";

class FzDefault extends Component {
  // 從 FzTable.jsx 收到的值傳進 state
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      columnDate: props.dataList.columnDate, //　行程表 左側欄
      rowDate: props.dataList.rowDate, //　行程表 上排
      contentDate: props.dataList.data, //　行程表 Data

      itemULW:
        (100 * props.dataList.rowDate.length) / props.dataList.count.show, // Ul　寬度計算
      itemLIW: 100 / props.dataList.rowDate.length, // li　寬度計算

      sliderIndex: 0, // 目前的　index
      sliderLiLen: props.dataList.columnDate.length, // slider 裡有幾個　li

      styleName: props.className, // 目前用哪個　layout
      show: props.dataList.count.show, // M　版顯示多少格
      slide: props.dataList.count.slide, // 移動多少格
      speed: props.dataList.speed, // 移動多少速度
      ifPC: true, // 是否　pc 狀態
      sliderLeft: 0 // slider left 移動多少
    };
    // this.windowSizeCheck = this.windowSizeCheck.bind(this);
  }

  // 輪播
  slider = e => {
    // 取小數點第 5 位
    let roundDecimal = function(val, precision) {
      return (
        Math.round(Math.round(val * Math.pow(10, (precision || 0) + 1)) / 10) /
        Math.pow(10, precision || 0)
      );
    };
    let elSlider = document.querySelector(".default .slider-move");
    let index = this.state.sliderIndex;
    let sliderLILen = this.state.sliderLiLen;
    let slide = this.state.slide;
    let move;

    if (e.target.classList.contains("next")) {
      // console.log("next");
      this.setState({ sliderIndex: ++index });
      if (index * slide >= sliderLILen) {
        console.log("超過了");
        this.setState({ sliderIndex: (index = 0) });
      }

      if (sliderLILen - index * slide < 3) {
        // slide = 1;
        // alert("下個超過");
      }
      console.log(index * slide, sliderLILen);
    } else {
      this.setState({ sliderIndex: --index });
      if (index < 0) {
        this.setState({ sliderIndex: (index = sliderLILen - 1) });
      }
    }

    console.log(
      "移動多少:" +
        roundDecimal(this.state.itemULW, 4) / this.state.sliderLiLen,
      "slide:" + slide,
      "index:" + index
    );

    move =
      (roundDecimal(this.state.itemULW, 4) / this.state.sliderLiLen) *
      slide *
      index *
      -1;

    this.setState({ sliderLeft: (this.state.sliderLeft = move) }); // 紀錄目前 left　的位置
    elSlider.style.left = move + "%";
  };

  componentDidMount() {
    // 初始判定螢幕目前的狀態
    let self = this;
    if (window.innerWidth > 768) {
      self.setState({ ifPC: true });
    } else {
      self.setState({ ifPC: false });
    }

    // 當螢幕寬度大於 768 時把 style 全部刪掉，小於時則全部 + style
    window.addEventListener("resize", function(e) {
      // self.windowSizeCheck(e);
      // let elSliderUL = document.querySelectorAll(".slider-move ul");
      // let elSliderLI = document.querySelectorAll(".slider-move li");
      if (e.target.innerWidth > 768) {
        self.setState({ ifPC: true });
      } else {
        self.setState({ ifPC: false });
      }
      self.getValue().ulW;
      self.getValue().liW;
      // console.log(self.state.ifPC);
    }); // window end
    // console.log(self.state.ifPC);
  }

  // 回傳各種值
  getValue() {
    const { ifPC } = this.state;
    let ulW = ifPC ? "auto" : this.state.itemULW + "%";
    let liW = ifPC ? "auto" : this.state.itemLIW + "%";
    return { ulW, liW };
  }

  // 被點擊時，十字 focus
  whenclicked = (e, index) => {
    console.log(e, index);

    // let rowTd = e.target.parentNode.childNodes;
    // let tableAllTd = document.querySelectorAll("tbody tr td");
    // let tableAllTr = document.querySelectorAll("tbody tr");
    // // 清除所有 activeThis，active
    // for (let i = 0; i < tableAllTd.length; i++) {
    //   tableAllTd[i].classList.remove("activeThis");
    //   tableAllTd[i].classList.remove("active");
    // }
    // // row 除了 activeThis 其餘加入 active
    // for (let i = 0; i < rowTd.length; i++) {
    //   if (
    //     rowTd[i].classList.value !== "activeThis" &&
    //     rowTd[i].tagName !== "TH"
    //   ) {
    //     rowTd[i].classList.add("active");
    //   }
    // }
    // // column，加上 active
    // for (let i = 0; i < tableAllTr.length; i++) {
    //   tableAllTr[i].childNodes[index + 1].classList.add("active");
    // }
    // // 點到的先加 activeThis
    // e.target.classList.remove("active"); // 自己本身移掉 active
    // e.target.classList.add("activeThis"); // 自己加上 active
  };

  render() {
    return (
      <div className={this.state.styleName}>
        <div
          className="fas fa-angle-right next"
          onClick={e => this.slider(e)}
        />
        <div className="fas fa-angle-left prev" onClick={e => this.slider(e)} />
        <div className="left">
          <div className="BackAndGo">
            <span>去程</span>
            <span>回程</span>
          </div>
          <ul className="columnStyle">
            {this.state.columnDate.map((tags, i) => {
              return <li key={i}>{tags}</li>;
            })}
          </ul>
        </div>
        <div className="right">
          <div
            className="slider-move"
            style={{
              transition: "all " + this.state.speed + "s ease",
              left:
                this.state.ifPC == true ? 0 + "%" : this.state.sliderLeft + "%"
            }}
          >
            {/* <ul style={{ width: this.state.itemULW + "%" }}> */}
            <ul className="rowStyle" style={{ width: this.getValue().ulW }}>
              {this.state.rowDate.map((tags, i) => {
                return (
                  <li style={{ width: this.getValue().liW }} key={i}>
                    {tags}
                  </li>
                );
              })}
            </ul>

            {this.state.contentDate.map((tags, i) => {
              return (
                <ul key={i} style={{ width: this.getValue().ulW }}>
                  {tags.value.map((value, i) => {
                    return (
                      <li
                        style={{ width: this.getValue().liW }}
                        key={i}
                        className={value == 12300 ? "sale" : null}
                        onClick={e => this.whenclicked(e, i)}
                      >
                        {!isNaN(value) ? (
                          <span>
                            ${value}
                            <span className="gray">起</span>
                          </span>
                        ) : (
                          <span className="gray">{value}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>

                // <ul
                //   key={i}
                //   style={{ width: (100 * 7) / this.state.show + "%" }}
                // >
                //   {/* {this.createLi(tags)} */}
                //   {tags.value.map((index, i) => {
                //     return (
                //       <li style={{ width: 100 / 7 + "%" }} key={i}>
                //         {index}
                //       </li>
                //     );
                //     // width: calc(100%/7);
                //   })}
                // </ul>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default FzDefault;
