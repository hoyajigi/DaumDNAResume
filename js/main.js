// 초기 환경 설정 - DOM이 준비 되었을 경우
jQuery(document).ready(function() {
	// 기본 환경 설정
	initConfig();			
});


// 모바일 최대 너비
mobileMaxWidth = 1023;

// 기본 환경 설정 함수
function initConfig() {
	// 키 눌림 시
	jQuery("body").keydown(function(event) {
		// 키보드 사용시 실행
		onKeycode(event);
	});


	// 비 IE일 경우
	if (window.addEventListener) {
		// 마우스 휠 이벤트 등록
		window.addEventListener("DOMMouseScroll", wheel, false);
	}

	// 마우스 휠 이벤트 등록(IE)
	window.onmousewheel = document.onmousewheel = wheel;


	// 스크롤 표시 여부 설정
	scrollSet();
	
	// 모바일 최대 너비를 초과하는지 확인
	if (window.innerWidth > mobileMaxWidth) {
		// 내용 영역 사이즈 설정
		contentAreaResize();
		// 배경 이미지 사이즈 설정
		bgImageResize();
		// 스크롤 위치 지정
		scrollTopAction();
	}			

	// 기기 종류 파악을 위한 정보 추출(아이폰, 아이패드)
	var isIDevice = (/iphone|ipad/gi).test(navigator.appVersion);

	// 아이폰, 아이패드일 경우
	if (isIDevice) {
		// 기기 회전시
		jQuery(window).on("orientationchange", function() {
			// 스크롤 표시 여부 설정
			scrollSet();

			// 모바일 최대 너비를 초과하는지 확인
			if (window.innerWidth > mobileMaxWidth) {
				// 내용 영역 사이즈 설정
				contentAreaResize();
				// 배경 이미지 사이즈 설정
				bgImageResize();
				// 스크롤 위치 지정
				scrollTopAction();
			}	
		});
	// 아이폰, 아이패드가 아닐 경우
	} else {
		// 기기 회전(안드로이드)이나 창 사이즈 변경시
		jQuery(window).on("resize", function(e) {
			// 스크롤 표시 여부 설정
			scrollSet();

			// 모바일 최대 너비를 초과하는지 확인
			if (window.innerWidth > mobileMaxWidth) {
				// 내용 영역 사이즈 설정
				contentAreaResize();
				// 배경 이미지 사이즈 설정
				bgImageResize();
				// 스크롤 위치 지정
				scrollTopAction();
			}
		});
	}
}


// 스크롤 표시 여부 설정 함수(y축)
function scrollSet() {
	// 모바일 최대 너비를 초과할 경우
	if (window.innerWidth > mobileMaxWidth) {
		// 스크롤을 없앰
		jQuery("html").css("overflow-y", "hidden");
	// 모바일 최대 너비를 초과하지 않을 경우
	} else {
		// 스크롤을 표시
		jQuery("html").css("overflow-y", "scroll");
	}
}


// 내용 영역 사이즈 설정 함수
function contentAreaResize() {
	// 내용 영역 너비 지정
	jQuery(".pc-wrap .content-area").css("width", window.innerWidth + "px");
	// 내용 영역 높이 지정
	jQuery(".pc-wrap .content-area").css("height", window.innerHeight + "px");
}


// 배경 이미지 사이즈 설정 함수
function bgImageResize() {
	// 배경 이미지 사이즈 값 배열(너비, 높이, 너비, 높이, ....)
	var bgImageSizeValue = [1600, 845, 1600, 755];

	// 배경 이미지 너비 배열
	var bgImageWidth = new Array();
	// 배경 이미지 높이 배열
	var bgImageHeight = new Array();
	// 배경 이미지 개수 - 1
	var bgImageNumber = 0;
	
	// 배경이미지 사이즈 값에 따른 지정
	for (i = 0; i < bgImageSizeValue.length; i++) {
		// 짝수일 경우
		if (i % 2 == 0) {
			// 배경 이미지 너비 지정
			bgImageWidth[bgImageNumber] = bgImageSizeValue[i];
		// 홀수일 경우
		} else if (i % 2 == 1) {
			// 배경 이미지 높이 지정
			bgImageHeight[bgImageNumber] = bgImageSizeValue[i];

			// 배경 이미지 개수 증감
			bgImageNumber++;
		}				
	}

	// 배경 이미지 사이즈 조정
	for (i = 0; i < bgImageSizeValue.length / 2; i++) {
		// 창 너비에 따른 이미지 너비 지정
		var newWidth = window.innerWidth;
		// 새로 지정된 이미지 너비에 따른 이미지 높이 지정
		var newHeight = bgImageHeight[i] * newWidth / bgImageWidth[i];

		// 창 높이
		var tempHeight = window.innerHeight;

		// 창 높이가 새로 지정된 이미지 높이보다 클 경우
		if (newHeight < tempHeight) {
			// 창 높이에 따른 이미지 높이 지정
			newHeight = tempHeight;
			// 새로 지정된 이미지 높이에 따른 이미지 너비 지정
			newWidth = bgImageWidth[i] * newHeight / bgImageHeight[i];			
		}	

		// 이미지 요소 
		var imageElement =  ".pc-wrap .bg-image-0" + Number(i + 1);
		
		// 이미지 너비 지정
		jQuery(imageElement).css("width", newWidth + "px");
		// 이미지 높이 지정
		jQuery(imageElement).css("height", newHeight + "px");
	}
}

// 키보드 사용 함수
function onKeycode(event){
	// 모바일 최대 너비를 초과하는지 확인
	if (window.innerWidth > mobileMaxWidth) {
		// 키보드 사용 중지
		event.preventDefault();

		// 키보드 화살표 위키 사용시
		if (event.keyCode == 38) {
			// 위로 이동
			stateValueAction("up");
		// 키보드 화살표 아래키 사용시
		} else if (event.keyCode == 40){
			// 아래로 이동
			stateValueAction("down");
		}	
	}
}

// 마우스 휠 이동 핸들 함수
function handle(delta) {		
	// 모바일 최대 너비를 초과하는지 확인
	if (window.innerWidth > mobileMaxWidth) {
		// 아래로 이동 값일 경우
		if (delta < 0) {
			// 아래로 이동
			stateValueAction("down");
		// 위로 이동 값일 경우
		} else {
			// 위로 이동
			stateValueAction("up");
		}
	}
}

// 마우스 휠 함수
function wheel(event) {
	// 상하 확인용 변수
	var delta = 0;

	// 이벤트가 없을 경우
	if (!event) {
		// IE 이벤트 지정
		event = window.event;
	}

	// 마우스 휠 이벤트가 검출될 경우
	if (event.wheelDelta) { 
		// 상하 값 지정
		delta = event.wheelDelta / 120;

		// 오페라일 경우
		if (window.opera) {
			// 음수값 지정
			delta = -delta;
		}
	// 마우스 휠 상세 이벤트가 검출될 경우
	} else if (event.detail) { 
		 // 상하 값 지정
		delta = -event.detail / 3;
	}

	// 마우스 휠 이벤트 값이 있을 경우
	if (delta) {
		// 마우스 휠 이동 핸들 함수 호출
		handle(delta);
	}			
}		


// 애니메이션 지정자 함수
function animateAction(target, attribute, value, speed) {
	// 투명도일 경우
	if (attribute == "opacity") {
		// 애니메이션 지정
		jQuery(target).animate({opacity : value}, speed);
	// 스크롤 이동일 경우
	} else if (attribute == "scrollTop") {
		// 애니메이션 지정
		jQuery(target).animate({scrollTop : value}, speed);
	}
}


// 화면 상태 값
var stateValue = 0;
// 스크롤 상태
var scrolling = "no";

// 화면 상태 값에 따른 처리 함수
function stateValueAction(state) {
	var section01 = ".pc-wrap #section-01";
	var section02 = ".pc-wrap #section-02";
	var section03 = ".pc-wrap #section-03";
	var section04 = ".pc-wrap #section-04";
	var section05 = ".pc-wrap #section-05";

	// 화면 이동시 사용 선택자
	var actionSelect = "html:not(:animated),body:not(:animated)";



	// 아래로 이동시
	if (state == "down" && jQuery(window).scrollTop() != jQuery(section05).offset().top && scrolling == "no") {
		// 이동해야 되는 영역
		var sectionAction = "";

		if (stateValue == 0) {
			sectionAction = section02;
		} else if (stateValue == 1) {
			sectionAction = section03;
		} else if (stateValue == 2) {
			sectionAction = section04;
		} else if (stateValue == 3) {
			sectionAction = section05;
		} 
		
		// 마지막 화면일 경우
		if (stateValue == 4) {
		// 전체 스크롤이 필요한 페이지
		} else {
			// 스크롤 상태로 지정
			scrolling = "yes";

			// 시간 간격에 따른 처리
			setTimeout(function() {
				// 화면 이동
				jQuery(actionSelect).animate({scrollTop : jQuery(sectionAction).offset().top}, 800, function() {							
					// 스크롤 아닌 상태로 지정
					scrolling = "no";
				});	
			}, 20);
		
			// 상태값 증가
			stateValue = stateValue + 1;
		}
	// 위로 이동시
	} else if (state == "up" && jQuery(window).scrollTop() != 0 && scrolling == "no") {
		// 이동해야 되는 영역
		var sectionAction = "";

		// 세번째 화면에서
		if (stateValue == 4) {
			// 두번째 화면으로
			sectionAction = section04;
		// 두번째 화면에서
		} else if (stateValue == 1) {
			// 첫번째 화면으로
			sectionAction = section01;
		} else if (stateValue == 2) {
			// 첫번째 화면으로
			sectionAction = section02;
		} else if (stateValue == 3) {
			// 첫번째 화면으로
			sectionAction = section03;
		}
		
		// 첫번째 화면일 경우
		if (stateValue == 0) {
		// 전체 스크롤이 필요한 페이지
		} else {
			// 스크롤 상태로 지정
			scrolling = "yes";
			// 시간 간격에 따른 처리
			setTimeout(function() {
				// 화면 이동
				jQuery(actionSelect).animate({scrollTop : jQuery(sectionAction).offset().top}, 800, function() {
					// 스크롤 아닌 상태로 지정
					scrolling = "no";
				});	
			}, 20);
		
			// 상태값 감소
			stateValue = stateValue - 1;
		}
	}
}

// 스크롤 위치 지정 함수
function scrollTopAction() {
	var section01 = ".pc-wrap #section-01";
	var section02 = ".pc-wrap #section-02";
	var section03 = ".pc-wrap #section-03";
	var section04 = ".pc-wrap #section-04";
	var section05 = ".pc-wrap #section-05";
	// 화면 이동시 사용 선택자
	var actionSelect = "html:not(:animated),body:not(:animated)";

	// 화면 상태 값이 첫번째 화면일 경우
	if (stateValue == 0) {
		// 첫번째 화면으로 스크롤 이동
		jQuery(actionSelect).scrollTop(jQuery(section01).offset().top);
	// 화면 상태 값이 두번째 화면일 경우
	} else if (stateValue == 1) {
		// 두번째 화면으로 스크롤 이동
		jQuery(actionSelect).scrollTop(jQuery(section02).offset().top);
	// 화면 상태 값이 세번째 화면일 경우
	} else if (stateValue == 2) {
		// 두번째 화면으로 스크롤 이동
		jQuery(actionSelect).scrollTop(jQuery(section03).offset().top);
	// 화면 상태 값이 세번째 화면일 경우
	} else if (stateValue == 3) {
		// 두번째 화면으로 스크롤 이동
		jQuery(actionSelect).scrollTop(jQuery(section04).offset().top);
	// 화면 상태 값이 세번째 화면일 경우
	} else if (stateValue == 4) {
		// 세번째 화면으로 스크롤 이동
		jQuery(actionSelect).scrollTop(jQuery(section05).offset().top);
	}
}