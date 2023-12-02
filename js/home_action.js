/**
 * 
 */
"use strict";
var audioElements = [];
var audios = [];
let songIndex = -1;

let playButton = document.getElementById('playButton');
let nextButton = document.getElementById('next');
let previousButton = document.getElementById('previous');
let progressbar = document.getElementById('progressBar');

$(function ()
{
    preparePlayDiv();
    preparePlayList(songsCollection);
    $('body').on('click', '#playListDiv', function (event)
    {
        var target = event.target || event.srcElement;
        var targetId = target.id;
        if (targetId.indexOf('playListDiv') != -1)
        {
            var currentSong = $(this).attr("value");
            var songName = $(this).text();
            preparePlayDiv(songName);
            preparePlaySong(currentSong);
            $("#playButton").click();
            //currentSong.push(audios);
        }
    });

    $('#next').on('click', function ()
    {
        if (songIndex < audioElements.length - 1)
        {
            songIndex++;
            playSongAtIndex(songIndex);
        }
    });

    $('#previous').on('click', function ()
    {
        if (songIndex > 0)
        {
            songIndex--;
            playSongAtIndex(songIndex);
        }
    });
});

function preparePlayList(songsCollection)
{
    try
    {
        var rootElement = $("#playlist");
        rootElement.empty();
        for (let i = 0; i < songsCollection.length; i++)
        {
            var name = songsCollection[i].name;
            var song = songsCollection[i].song;
            //var id = songsCollection[i].id;

            var playlist = $('<div>', {
                class: 'd-flex border-bottom px-2 py-1 justify-content-between',
                id: 'mainListDIv',
                style: ''
            }).append($('<a>', {
                class: 'nameLimit',
                text: name,
                value: song,
                id: 'playListDiv'
            })).append($('<i>', {
                class: 'fa-solid fa-play px-2 py-1',
                id: "playListDiv",
            }));
            rootElement.append(playlist);
        }
    }
    catch (e) {
        console.log(e);
    }
}

function preparePlayDiv(songData)
{
    try
    {
        var rootElement = $("#songProgressDiv");
        rootElement.empty();
        var mainDiv = $('<div>', {
            class: '',
            id: "playListDiv"
        });

        var progressBar = "<input type='range' style='cursor: pointer;' class='w-100' value='0' id='progressbar' min='0' max='100'>"
        mainDiv.append(progressBar);

        var songDiv = $('<div>', {
            class: 'd-flex',
            id: ""
        });
        var songName = $('<div>', {
            class: 'col-5 d-flex px-2 nameLimit',
            text: songData
        });
        songDiv.append(songName);

        var buttonMainDiv = $('<div>', {
            class: 'px-5 mx-4'
        });
        var forwardButton = "<i class='fa-solid fa-backward-step px-2' style='cursor: pointer;' id='previous'></i>"
        var playButton = "<i class='fa-solid fa-play px-2' style='cursor: pointer;' id='playButton'></i>"
        var nextButton = "<i class='fa-solid fa-forward-step px-2' style='cursor: pointer;' id='next'></i>"
        var buttonDiv = [forwardButton, playButton, nextButton];
        buttonMainDiv.append(buttonDiv);
        songDiv.append(buttonMainDiv);

        songDiv.append($('<div>', {
            class: 'px-5 mx-4'
        }));
        mainDiv.append(songDiv);
        rootElement.append(mainDiv);
    }
    catch (e)
    {
        console.log(e);
    }
}
function preparePlaySong(currentSong)
{
    if (audioElements[songIndex])
    {
        audioElements[songIndex].pause();
    }

    let audio = new Audio(currentSong);
    audioElements.push(audio);
    songIndex = audioElements.length - 1;

    $('#playButton').on('click', function ()
    {
        let playButton = $(this);
        let audio = audioElements[songIndex];

        if (audio.paused || audio.currentTime <= 0) {
            console.log('playing');
            audio.play();
            playButton.addClass('fa-pause').removeClass('fa-play');
        } else {
            console.log('pause');
            audio.pause();
            playButton.addClass('fa-play').removeClass('fa-pause');
        }
    });

    let progressBar = $('#progressbar');
    progressBar.on('input', function ()
    {
        audio.currentTime = ($(this).val() / 100) * audio.duration;
    });

    audio.addEventListener('timeupdate', function ()
    {
        let progress = parseInt((audio.currentTime / audio.duration) * 100);
        progressBar.val(progress);
    });
}

function playSongAtIndex(index)
{
    if (audioElements[index])
    {
        preparePlaySong(audioElements[index].src);
    }
}