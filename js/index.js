function getStyle(obj, name) {
    if (obj.currentStyle) {
        return obj.currentStyle[name];
    } else {
        return getComputedStyle(obj, false)[name];
    }
}

function getByClass(oParent, nClass) {
    var eLe = oParent.getElementsByTagName('*'); // 获取所有子元素
    var aRrent = [];
    for (var i = 0; i < eLe.length; i++) {
        if (eLe[i].className === nClass) {
            aRrent.push(eLe[i]);
        }
    }
    return aRrent;
}

function startMove(obj, att, add) {
    clearInterval(obj.timer); // 清除之前的定时器
    obj.timer = setInterval(function() {
        var cutt = 0;
        if (att === 'opacity') {
            cutt = Math.round(parseFloat(getStyle(obj, att))); 
        } else {
            cutt = Math.round(parseInt(getStyle(obj, att)));
        }
        var speed = (add - cutt) / 4;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
        if (cutt == add) {
            clearInterval(obj.timer);
        } else {
            if (att == 'opacity') {
                obj.style.opacity = (cutt + speed) / 100;
                obj.style.filter = 'alpha(opacity:' + (cutt + speed) + ')';
            } else {
                obj.style[att] = cutt + speed + 'px'; // 修改为 'px'
            }
        }
    }, 30);
}



window.onload = function() {
    var oDiv = document.getElementById('playBox');
    var oPre = getByClass(oDiv, 'pre')[0];
    var oNext = getByClass(oDiv, 'next')[0];
    var oUlBig = getByClass(oDiv, 'oUlplay')[0];
    var aBigLi = oUlBig.getElementsByTagName('li');
    var oDivSmall = getByClass(oDiv, 'smalltitle')[0];
    var aLiSmall = oDivSmall.getElementsByTagName('li');
    var now = 0;

    function tab() {
        for (var i = 0; i < aLiSmall.length; i++) {
            aLiSmall[i].className = '';
        }
        aLiSmall[now].className = 'thistitle';
        startMove(oUlBig, 'left', -(now * aBigLi[0].offsetWidth));
    }

    for (var i = 0; i < aLiSmall.length; i++) {
        aLiSmall[i].index = i;
        aLiSmall[i].onclick = function() {
            now = this.index;
            tab();
        };
    }

    oPre.onclick = function() {
        now--;
        if (now < 0) {
            now = aBigLi.length - 1;
        }
        tab();
    };

    oNext.onclick = function() {
        now++;
        if (now >= aBigLi.length) {
            now = 0;
        }
        tab();
    };

    var timer = setInterval(oNext.onclick, 2000); // 滚动间隔时间设置

    oDiv.onmouseover = function() {
        clearInterval(timer);
    };
    oDiv.onmouseout = function() {
        timer = setInterval(oNext.onclick, 2000);
    };
}; 

    function updateCountdown() {
        const targetDate = new Date('2025-12-12T00:00:00'); // 目标时间
        const currentDate = new Date(); // 当前时间

        const timeDifference = targetDate - currentDate; // 获取剩余的时间差（毫秒）
    
        if (timeDifference <= 0) {
            // 如果时间到了，显示为 00:00:00:00
            document.getElementById('day').textContent = '00';
            document.getElementById('hour').textContent = '00';
            document.getElementById('minute').textContent = '00';
            document.getElementById('second').textContent = '00';
            document.getElementById('millisecond').textContent = '000'; 
            return;
        }

        // 计算剩余的天、小时、分钟和秒
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
        const milliseconds = (timeDifference % 1000 / 10).toFixed(0) ;
        
        // 更新页面上的倒计时显示
        //如果元素不存在则什么都不干
        if(document.getElementById("day") == null) return;
        document.getElementById("day") .innerText = String(days).padStart(2, '0');
        document.getElementById("hour").innerText = String(hours).padStart(2, '0');
        document.getElementById('minute').innerText = String(minutes).padStart(2, '0')
        document.getElementById('second').innerText = String(seconds).padStart(2, '0');
        document.getElementById('millisecond').innerText = String(milliseconds).padStart(2, '0');
    }

    // 每秒更新一次倒计时
    setInterval(updateCountdown, 70);

    // 页面加载时立即执行一次，确保页面一开始就显示倒计时
    updateCountdown();
    
