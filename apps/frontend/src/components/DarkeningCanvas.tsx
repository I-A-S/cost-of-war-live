import { useEffect, useRef, useState } from 'react';

function mulberry32(a: number) {
  return function() {
    var t = a += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  }
}

export const BASE_GOALS = [
  "hoping to launch a tech startup to honor their grandparents.",
  "hoping to graduate from university to honor their grandparents.",
  "dreaming of learning a new language with their best friend.",
  "looking forward to getting their pilot's license next spring.",
  "training to reunite with their estranged sibling with their local community.",
  "about to plant a community garden with their sibling.",
  "getting ready to build a library in their town next spring.",
  "working to become a school teacher this upcoming year.",
  "preparing to retire by the ocean to honor their grandparents.",
  "about to foster a child after recovering from surgery.",
  "learning to become a chef next spring.",
  "trying to build a library in their town for their children.",
  "training to finish writing a novel with their sibling.",
  "planning to graduate from university with their best friend.",
  "dreaming of fostering a child before turning thirty.",
  "training to buy their first home next spring.",
  "planning to propose to their partner as soon as they saved enough.",
  "training to start a family after recovering from surgery.",
  "training to become a school teacher over the winter holidays.",
  "looking forward to planting a community garden after recovering from surgery.",
  "learning to reunite with their estranged sibling before turning thirty.",
  "training to get their pilot's license over the winter holidays.",
  "saving up to open a small cafe once the weather gets warmer.",
  "working to learn a new language for their children.",
  "training to learn how to play the piano once the weather gets warmer.",
  "trying to start a family next spring.",
  "waiting to foster a child with their best friend.",
  "dreaming of becoming a school teacher to make their parents proud.",
  "getting ready to see the northern lights over the winter holidays.",
  "preparing to master woodworking in the summer.",
  "saving up to go on a cross-country road trip once the weather gets warmer.",
  "waiting to learn a new language to make their parents proud.",
  "trying to adopt a rescue dog in the countryside.",
  "learning to graduate from university to make their parents proud.",
  "training to become a chef once the weather gets warmer.",
  "preparing to get their pilot's license with their local community.",
  "preparing to finish writing a novel in the summer.",
  "working to finish medical school over the winter holidays.",
  "waiting to learn how to play the piano before the decade ends.",
  "studying to become a school teacher this upcoming year.",
  "waiting to see the northern lights with their sibling.",
  "excited to master woodworking before turning thirty.",
  "planning to pay off their family's debt next spring.",
  "about to buy their first home with their best friend.",
  "preparing to start a family in the countryside.",
  "about to buy their first home with their sibling.",
  "planning to reunite with their estranged sibling in their hometown.",
  "training to buy their first home in the countryside.",
  "waiting to learn how to play the piano next spring.",
  "saving up to reunite with their estranged sibling with their local community.",
  "excited to build a library in their town to make their parents proud.",
  "learning to learn how to play the piano with their best friend.",
  "looking forward to becoming a chef next spring.",
  "getting ready to rebuild a classic car to make their parents proud.",
  "learning to master woodworking before turning thirty.",
  "looking forward to building a cabin this upcoming year.",
  "waiting to finish medical school to celebrate their anniversary.",
  "dreaming of traveling across the country to make their parents proud.",
  "studying to build a cabin before the decade ends.",
  "trying to take their parents on a vacation with their best friend.",
  "excited to see the northern lights to honor their grandparents.",
  "getting ready to pay off their family's debt in the summer.",
  "looking forward to going on a cross-country road trip before the decade ends.",
  "working to launch a tech startup after recovering from surgery.",
  "saving up to build a cabin in their hometown.",
  "trying to buy their first home after graduation.",
  "about to learn how to play the piano before turning thirty.",
  "looking forward to buying their first home next spring.",
  "excited to become a school teacher next spring.",
  "learning to rebuild a classic car before turning thirty.",
  "studying to reunite with their estranged sibling with their local community.",
  "getting ready to finish medical school this upcoming year.",
  "working to build a library in their town in the countryside.",
  "trying to become a school teacher with their sibling.",
  "about to reunite with their estranged sibling over the winter holidays.",
  "training to plant a community garden in the summer.",
  "preparing to foster a child in the summer.",
  "getting ready to see the northern lights in the countryside.",
  "studying to run a local marathon after graduation.",
  "excited to learn a new language to make their parents proud.",
  "about to get their pilot's license next spring.",
  "working to retire by the ocean once the weather gets warmer.",
  "preparing to learn a new language next spring.",
  "preparing to build a cabin once the weather gets warmer.",
  "waiting to finish medical school with their best friend.",
  "hoping to propose to their partner before turning thirty.",
  "working to start a family over the winter holidays.",
  "saving up to take their parents on a vacation to honor their grandparents.",
  "trying to start a family in the summer.",
  "looking forward to mastering woodworking next spring.",
  "working to retire by the ocean next spring.",
  "studying to take their parents on a vacation once the weather gets warmer.",
  "working to go on a cross-country road trip to make their parents proud.",
  "training to foster a child in the summer.",
  "preparing to launch a tech startup next spring.",
  "about to build a cabin once the weather gets warmer.",
  "studying to run a local marathon with their sibling.",
  "looking forward to traveling across the country before the decade ends.",
  "preparing to retire by the ocean over the winter holidays.",
  "looking forward to getting their pilot's license in the countryside.",
  "working to buy their first home to honor their grandparents.",
  "getting ready to adopt a rescue dog with their local community.",
  "studying to master woodworking to honor their grandparents.",
  "dreaming of launching a tech startingup in the countryside.",
  "excited to go on a cross-country road trip after recovering from surgery.",
  "training to go on a cross-country road trip before the decade ends.",
  "planning to travel across the country in their hometown.",
  "getting ready to see the northern lights once the weather gets warmer.",
  "waiting to graduate from university in the summer.",
  "looking forward to taking their parents on a vacation to celebrate their anniversary.",
  "trying to finish medical school to make their parents proud.",
  "trying to adopt a rescue dog after recovering from surgery.",
  "working to reunite with their estranged sibling over the winter holidays.",
  "trying to get their pilot's license next spring.",
  "preparing to start a family after recovering from surgery.",
  "training to finish writing a novel to honor their grandparents.",
  "studying to go on a cross-country road trip with their best friend.",
  "excited to run a local marathon this upcoming year.",
  "looking forward to getting their pilot's license with their local community.",
  "dreaming of rebuildinging a classic car over the winter holidays.",
  "trying to finish medical school after graduation.",
  "waiting to buy their first home this upcoming year.",
  "about to go on a cross-country road trip once the weather gets warmer.",
  "dreaming of finishing writing a novel after recovering from surgery.",
  "preparing to learn a new language before the decade ends.",
  "trying to build a cabin this upcoming year.",
  "excited to start a family to celebrate their anniversary.",
  "looking forward to running a local marathon before turning thirty.",
  "working to pay off their family's debt before the decade ends.",
  "looking forward to adopting a rescue dog in the summer.",
  "looking forward to reuniting with their estranged sibling as soon as they saved enough.",
  "dreaming of running a local marathon this upcoming year.",
  "looking forward to building a library in their town with their sibling.",
  "training to learn how to play the piano with their best friend.",
  "about to build a library in their town for their children.",
  "training to start a family with their best friend.",
  "planning to go on a cross-country road trip in their hometown.",
  "preparing to pay off their family's debt for their children.",
  "getting ready to finish medical school as soon as they saved enough.",
  "trying to build a library in their town over the winter holidays.",
  "hoping to master woodworking this upcoming year.",
  "preparing to buy their first home with their sibling.",
  "learning to run a local marathon next spring.",
  "planning to finish writing a novel after recovering from surgery.",
  "planning to get their pilot's license after graduation.",
  "planning to see the northern lights for their children.",
  "waiting to propose to their partner to honor their grandparents.",
  "learning to become a chef to honor their grandparents.",
  "studying to learn how to play the piano in the countryside.",
  "preparing to foster a child once the weather gets warmer.",
  "getting ready to launch a tech startup in the countryside.",
  "planning to master woodworking in the summer.",
  "hoping to retire by the ocean in the summer.",
  "hoping to finish medical school next spring.",
  "hoping to become a school teacher before turning thirty.",
  "planning to propose to their partner to make their parents proud.",
  "dreaming of fostering a child with their sibling.",
  "about to learn a new language in the summer.",
  "trying to take their parents on a vacation in the summer.",
  "preparing to see the northern lights in their hometown.",
  "training to finish medical school before the decade ends.",
  "training to go on a cross-country road trip to honor their grandparents.",
  "preparing to become a school teacher once the weather gets warmer.",
  "preparing to pay off their family's debt before turning thirty.",
  "preparing to launch a tech startup to make their parents proud.",
  "about to reunite with their estranged sibling before turning thirty.",
  "preparing to reunite with their estranged sibling in their hometown.",
  "getting ready to open a small cafe for their children.",
  "about to launch a tech startup in the countryside.",
  "learning to reunite with their estranged sibling with their sibling.",
  "learning to run a local marathon with their sibling.",
  "saving up to learn how to play the piano to honor their grandparents.",
  "preparing to finish medical school next spring.",
  "training to build a cabin before turning thirty.",
  "dreaming of planting a community garden after graduation.",
  "working to travel across the country in the countryside.",
  "dreaming of graduating from university in the countryside.",
  "saving up to buy their first home in the countryside.",
  "waiting to become a chef to celebrate their anniversary.",
  "preparing to foster a child after graduation.",
  "trying to become a chef with their best friend.",
  "working to get their pilot's license next spring.",
  "training to become a chef with their local community.",
  "waiting to start a family to make their parents proud.",
  "excited to graduate from university this upcoming year.",
  "preparing to propose to their partner to make their parents proud.",
  "dreaming of traveling across the country to honor their grandparents.",
  "studying to become a chef in the countryside.",
  "training to build a cabin with their sibling.",
  "working to adopt a rescue dog once the weather gets warmer.",
  "about to run a local marathon to honor their grandparents.",
  "hoping to buy their first home after recovering from surgery.",
  "learning to get their pilot's license with their best friend.",
  "working to get their pilot's license as soon as they saved enough.",
  "excited to travel across the country in their hometown.",
  "hoping to go on a cross-country road trip as soon as they saved enough.",
  "learning to start a family to celebrate their anniversary.",
  "trying to launch a tech startup before the decade ends.",
  "about to become a chef to celebrate their anniversary.",
  "studying to propose to their partner to honor their grandparents.",
  "getting ready to plant a community garden to celebrate their anniversary.",
  "training to finish medical school in the countryside.",
  "learning to open a small cafe with their local community.",
  "excited to foster a child in their hometown.",
  "working to open a small cafe with their sibling.",
  "about to build a library in their town after graduation.",
  "saving up to travel across the country this upcoming year.",
  "learning to propose to their partner once the weather gets warmer.",
  "waiting to build a cabin before turning thirty.",
  "looking forward to rebuildinging a classic car over the winter holidays.",
  "training to see the northern lights after recovering from surgery.",
  "excited to master woodworking for their children.",
  "trying to reunite with their estranged sibling after graduation.",
  "training to become a school teacher as soon as they saved enough.",
  "studying to build a library in their town with their local community.",
  "working to buy their first home to celebrate their anniversary.",
  "excited to start a family in the countryside.",
  "about to run a local marathon before the decade ends.",
  "saving up to see the northern lights before turning thirty.",
  "studying to run a local marathon with their best friend.",
  "waiting to build a cabin in their hometown.",
  "studying to reunite with their estranged sibling over the winter holidays.",
  "excited to retire by the ocean after recovering from surgery.",
  "saving up to learn how to play the piano before turning thirty.",
  "trying to go on a cross-country road trip to celebrate their anniversary.",
  "dreaming of finishing medical school to make their parents proud.",
  "learning to plant a community garden with their sibling.",
  "working to propose to their partner with their sibling.",
  "studying to retire by the ocean to honor their grandparents.",
  "dreaming of proposing to their partner in the summer.",
  "working to travel across the country to celebrate their anniversary.",
  "dreaming of finishing writing a novel with their local community.",
  "looking forward to taking their parents on a vacation to honor their grandparents.",
  "studying to reunite with their estranged sibling this upcoming year.",
  "hoping to foster a child over the winter holidays.",
  "working to launch a tech startup in the countryside.",
  "learning to become a chef this upcoming year.",
  "dreaming of going on a cross-country road trip before the decade ends.",
  "working to run a local marathon next spring.",
  "working to open a small cafe this upcoming year.",
  "dreaming of getting their pilot's license to celebrate their anniversary.",
  "hoping to take their parents on a vacation in the countryside.",
  "training to run a local marathon with their best friend.",
  "dreaming of traveling across the country in the summer.",
  "trying to pay off their family's debt for their children.",
  "excited to start a family with their local community.",
  "preparing to finish medical school after recovering from surgery.",
  "preparing to open a small cafe once the weather gets warmer.",
  "planning to plant a community garden after graduation.",
  "about to build a cabin to celebrate their anniversary.",
  "trying to buy their first home this upcoming year.",
  "working to open a small cafe in the countryside.",
  "about to rebuild a classic car to make their parents proud.",
  "planning to build a library in their town to make their parents proud.",
  "dreaming of retiring by the ocean after recovering from surgery.",
  "about to master woodworking with their sibling.",
  "trying to rebuild a classic car over the winter holidays.",
  "trying to rebuild a classic car before turning thirty.",
  "dreaming of seeing the northern lights once the weather gets warmer.",
  "looking forward to seeing the northern lights after graduation.",
  "waiting to start a family once the weather gets warmer.",
  "training to finish writing a novel for their children.",
  "about to retire by the ocean to honor their grandparents.",
  "dreaming of becoming a chef before the decade ends.",
  "studying to see the northern lights with their sibling.",
  "preparing to build a library in their town to honor their grandparents.",
  "learning to run a local marathon after recovering from surgery.",
  "waiting to finish medical school over the winter holidays.",
  "preparing to learn a new language over the winter holidays.",
  "trying to become a chef to celebrate their anniversary.",
  "learning to rebuild a classic car before the decade ends.",
  "learning to finish medical school in their hometown.",
  "trying to pay off their family's debt next spring.",
  "saving up to rebuild a classic car as soon as they saved enough.",
  "planning to get their pilot's license in the countryside.",
  "waiting to retire by the ocean in the countryside.",
  "getting ready to travel across the country to honor their grandparents.",
  "learning to see the northern lights once the weather gets warmer.",
  "looking forward to learning a new language to honor their grandparents.",
  "planning to see the northern lights this upcoming year.",
  "trying to become a chef with their sibling.",
  "working to launch a tech startup in the summer.",
  "looking forward to building a library in their town in the countryside.",
  "learning to reunite with their estranged sibling once the weather gets warmer.",
  "looking forward to buying their first home before the decade ends.",
  "excited to finish medical school in the summer.",
  "looking forward to buying their first home in the countryside.",
  "getting ready to plant a community garden as soon as they saved enough.",
  "saving up to take their parents on a vacation with their best friend.",
  "working to finish writing a novel to honor their grandparents.",
  "studying to reunite with their estranged sibling in the countryside.",
  "preparing to pay off their family's debt this upcoming year.",
  "waiting to foster a child after recovering from surgery.",
  "getting ready to run a local marathon in the summer.",
  "excited to learn how to play the piano with their sibling.",
  "learning to propose to their partner with their best friend.",
  "excited to become a chef after recovering from surgery.",
  "studying to open a small cafe next spring.",
  "preparing to adopt a rescue dog over the winter holidays.",
  "studying to propose to their partner as soon as they saved enough.",
  "preparing to run a local marathon with their local community.",
  "about to see the northern lights before the decade ends.",
  "working to launch a tech startup after graduation.",
  "training to see the northern lights as soon as they saved enough.",
  "learning to learn how to play the piano before the decade ends.",
  "about to see the northern lights once the weather gets warmer.",
  "preparing to reunite with their estranged sibling once the weather gets warmer.",
  "looking forward to proposing to their partner with their sibling.",
  "waiting to see the northern lights in their hometown.",
  "dreaming of going on a cross-country road trip in the summer.",
  "training to open a small cafe to make their parents proud.",
  "excited to launch a tech startup with their best friend.",
  "dreaming of starting a family in their hometown.",
  "training to become a chef before turning thirty.",
  "dreaming of buying their first home in the countryside.",
  "working to travel across the country once the weather gets warmer.",
  "training to reunite with their estranged sibling with their sibling.",
  "looking forward to starting a family to make their parents proud.",
  "trying to take their parents on a vacation with their sibling.",
  "getting ready to open a small cafe over the winter holidays.",
  "excited to get their pilot's license to make their parents proud.",
  "trying to propose to their partner with their best friend.",
  "hoping to rebuild a classic car with their local community.",
  "about to become a school teacher with their best friend.",
  "working to finish writing a novel over the winter holidays.",
  "training to graduate from university to honor their grandparents.",
  "trying to become a school teacher over the winter holidays.",
  "dreaming of seeing the northern lights next spring.",
  "trying to run a local marathon in their hometown.",
  "learning to take their parents on a vacation after recovering from surgery.",
  "studying to adopt a rescue dog with their best friend.",
  "dreaming of learning a new language next spring.",
  "about to become a school teacher to celebrate their anniversary.",
  "hoping to get their pilot's license next spring.",
  "studying to foster a child to celebrate their anniversary.",
  "excited to graduate from university after recovering from surgery.",
  "studying to plant a community garden in their hometown.",
  "excited to reunite with their estranged sibling after graduation.",
  "studying to foster a child next spring.",
  "hoping to learn a new language with their local community.",
  "learning to propose to their partner in the summer.",
  "saving up to rebuild a classic car to make their parents proud.",
  "training to finish medical school with their sibling.",
  "getting ready to finish medical school with their local community.",
  "saving up to run a local marathon in their hometown.",
  "dreaming of seeing the northern lights after recovering from surgery.",
  "excited to foster a child to celebrate their anniversary.",
  "looking forward to graduating from university over the winter holidays.",
  "planning to buy their first home over the winter holidays.",
  "working to start a family for their children.",
  "about to build a library in their town once the weather gets warmer.",
  "planning to start a family before the decade ends.",
  "getting ready to finish medical school to honor their grandparents.",
  "getting ready to retire by the ocean with their sibling.",
  "planning to build a library in their town to honor their grandparents.",
  "waiting to buy their first home to honor their grandparents.",
  "hoping to reunite with their estranged sibling to honor their grandparents.",
  "trying to foster a child this upcoming year.",
  "about to retire by the ocean once the weather gets warmer.",
  "getting ready to graduate from university for their children.",
  "learning to finish writing a novel before the decade ends.",
  "studying to build a library in their town after recovering from surgery.",
  "looking forward to paying off their family's debt in the countryside.",
  "working to travel across the country this upcoming year.",
  "saving up to rebuild a classic car in their hometown.",
  "preparing to reunite with their estranged sibling after recovering from surgery.",
  "working to rebuild a classic car once the weather gets warmer.",
  "waiting to propose to their partner to make their parents proud.",
  "excited to plant a community garden before the decade ends.",
  "saving up to become a chef once the weather gets warmer.",
  "hoping to travel across the country as soon as they saved enough.",
  "preparing to open a small cafe in the countryside.",
  "studying to reunite with their estranged sibling as soon as they saved enough.",
  "preparing to go on a cross-country road trip with their best friend.",
  "learning to take their parents on a vacation with their sibling.",
  "looking forward to going on a cross-country road trip over the winter holidays.",
  "learning to build a library in their town after graduation.",
  "working to become a school teacher in the countryside.",
  "hoping to foster a child before the decade ends.",
  "saving up to propose to their partner before the decade ends.",
  "trying to build a cabin with their sibling.",
  "training to master woodworking once the weather gets warmer.",
  "saving up to plant a community garden once the weather gets warmer.",
  "hoping to retire by the ocean in their hometown.",
  "waiting to launch a tech startup with their best friend.",
  "dreaming of buying their first home to honor their grandparents.",
  "dreaming of seeing the northern lights as soon as they saved enough.",
  "hoping to travel across the country after graduation.",
  "about to propose to their partner in the summer.",
  "training to buy their first home before turning thirty.",
  "training to build a library in their town to celebrate their anniversary.",
  "preparing to go on a cross-country road trip with their sibling.",
  "planning to go on a cross-country road trip for their children.",
  "dreaming of becoming a chef with their best friend.",
  "hoping to get their pilot's license for their children.",
  "preparing to learn a new language with their local community.",
  "about to learn how to play the piano before the decade ends.",
  "hoping to foster a child with their sibling.",
  "training to propose to their partner over the winter holidays.",
  "getting ready to adopt a rescue dog to honor their grandparents.",
  "learning to finish writing a novel this upcoming year.",
  "saving up to see the northern lights with their best friend.",
  "preparing to take their parents on a vacation this upcoming year.",
  "about to graduate from university this upcoming year.",
  "learning to go on a cross-country road trip in the countryside.",
  "working to plant a community garden to make their parents proud.",
  "waiting to reunite with their estranged sibling once the weather gets warmer.",
  "training to launch a tech startup after graduation.",
  "dreaming of learning how to play the piano for their children.",
  "training to rebuild a classic car in their hometown.",
  "looking forward to getting their pilot's license for their children.",
  "hoping to adopt a rescue dog before the decade ends.",
  "preparing to foster a child in their hometown.",
  "trying to learn how to play the piano to honor their grandparents.",
  "planning to reunite with their estranged sibling to make their parents proud.",
  "hoping to run a local marathon after recovering from surgery.",
  "saving up to build a cabin for their children.",
  "about to learn how to play the piano after graduation.",
  "excited to pay off their family's debt with their sibling.",
  "trying to finish writing a novel in their hometown.",
  "hoping to retire by the ocean over the winter holidays.",
  "looking forward to getting their pilot's license this upcoming year.",
  "saving up to rebuild a classic car with their local community.",
  "working to learn a new language after graduation.",
  "training to learn a new language over the winter holidays.",
  "preparing to become a chef next spring.",
  "getting ready to take their parents on a vacation to celebrate their anniversary.",
  "excited to run a local marathon once the weather gets warmer.",
  "studying to graduate from university with their local community.",
  "learning to finish writing a novel with their local community.",
  "about to retire by the ocean this upcoming year.",
  "preparing to see the northern lights over the winter holidays.",
  "about to learn a new language once the weather gets warmer.",
  "learning to reunite with their estranged sibling with their best friend.",
  "hoping to build a cabin after graduation.",
  "preparing to propose to their partner for their children.",
  "hoping to build a cabin after recovering from surgery.",
  "saving up to build a cabin with their local community.",
  "trying to take their parents on a vacation next spring.",
  "looking forward to running a local marathon to celebrate their anniversary.",
  "working to take their parents on a vacation as soon as they saved enough.",
  "excited to propose to their partner this upcoming year.",
  "saving up to adopt a rescue dog after recovering from surgery.",
  "training to become a chef to honor their grandparents.",
  "hoping to get their pilot's license after graduation.",
  "learning to finish writing a novel for their children.",
  "trying to propose to their partner as soon as they saved enough.",
  "hoping to retire by the ocean as soon as they saved enough.",
  "waiting to become a chef after graduation.",
  "studying to foster a child this upcoming year.",
  "learning to go on a cross-country road trip in the summer.",
  "studying to adopt a rescue dog once the weather gets warmer.",
  "dreaming of learning a new language to honor their grandparents.",
  "excited to launch a tech startup once the weather gets warmer.",
  "getting ready to foster a child to celebrate their anniversary.",
  "hoping to adopt a rescue dog to celebrate their anniversary.",
  "trying to finish writing a novel in the summer.",
  "preparing to become a school teacher next spring.",
  "dreaming of adopting a rescue dog over the winter holidays.",
  "saving up to learn how to play the piano next spring.",
  "waiting to run a local marathon for their children.",
  "training to master woodworking to honor their grandparents.",
  "working to see the northern lights with their best friend.",
  "hoping to pay off their family's debt to celebrate their anniversary.",
  "dreaming of retiring by the ocean this upcoming year.",
  "saving up to learn how to play the piano in the summer.",
  "dreaming of planting a community garden with their local community.",
  "saving up to build a cabin in the countryside.",
  "training to rebuild a classic car before the decade ends.",
  "dreaming of mastering woodworking after recovering from surgery.",
  "hoping to build a library in their town to celebrate their anniversary.",
  "waiting to become a school teacher with their local community.",
  "saving up to learn how to play the piano this upcoming year.",
  "hoping to master woodworking with their local community.",
  "about to retire by the ocean before turning thirty.",
  "learning to start a family in the summer.",
  "training to open a small cafe with their local community.",
  "saving up to rebuild a classic car after graduation.",
  "about to adopt a rescue dog in the summer.",
  "planning to become a chef after graduation.",
  "saving up to run a local marathon with their best friend.",
  "training to pay off their family's debt in the countryside.",
  "planning to become a school teacher in the summer.",
  "planning to adopt a rescue dog with their best friend.",
  "waiting to rebuild a classic car before turning thirty.",
  "planning to learn a new language over the winter holidays.",
  "waiting to open a small cafe to make their parents proud.",
  "getting ready to buy their first home after graduation.",
  "planning to become a chef once the weather gets warmer.",
  "looking forward to going on a cross-country road trip as soon as they saved enough.",
  "hoping to retire by the ocean after graduation.",
  "training to adopt a rescue dog over the winter holidays.",
  "looking forward to running a local marathon in the countryside.",
  "preparing to become a chef as soon as they saved enough.",
  "trying to become a school teacher in the summer.",
  "dreaming of running a local marathon to celebrate their anniversary.",
  "learning to travel across the country in their hometown.",
  "dreaming of fostering a child next spring.",
  "dreaming of opening a small cafe before the decade ends.",
  "studying to buy their first home next spring.",
  "trying to learn how to play the piano before the decade ends.",
  "training to reunite with their estranged sibling with their best friend.",
  "studying to buy their first home for their children.",
  "working to take their parents on a vacation to make their parents proud.",
  "saving up to travel across the country over the winter holidays.",
  "trying to finish medical school to celebrate their anniversary.",
  "planning to go on a cross-country road trip in the countryside.",
  "planning to take their parents on a vacation in the countryside.",
  "training to propose to their partner in the countryside.",
  "hoping to go on a cross-country road trip this upcoming year.",
  "learning to travel across the country after recovering from surgery.",
  "about to take their parents on a vacation in the countryside.",
  "looking forward to opening a small cafe in the countryside.",
  "about to see the northern lights in the countryside.",
  "training to become a school teacher to honor their grandparents.",
  "dreaming of proposing to their partner as soon as they saved enough.",
  "training to master woodworking after graduation.",
  "hoping to travel across the country to make their parents proud.",
  "studying to graduate from university to celebrate their anniversary.",
  "planning to build a library in their town before turning thirty.",
  "training to plant a community garden next spring.",
  "studying to become a school teacher to make their parents proud.",
  "waiting to adopt a rescue dog with their local community.",
  "excited to become a school teacher with their local community.",
  "learning to finish medical school to make their parents proud.",
  "learning to launch a tech startup to celebrate their anniversary.",
  "looking forward to buying their first home before turning thirty.",
  "planning to propose to their partner with their local community.",
  "learning to reunite with their estranged sibling this upcoming year.",
  "about to plant a community garden next spring.",
  "training to get their pilot's license before turning thirty.",
  "waiting to finish medical school this upcoming year.",
  "learning to go on a cross-country road trip to make their parents proud.",
  "looking forward to opening a small cafe in their hometown.",
  "preparing to plant a community garden with their best friend.",
  "getting ready to graduate from university before the decade ends.",
  "hoping to take their parents on a vacation to honor their grandparents.",
  "excited to take their parents on a vacation after recovering from surgery.",
  "trying to plant a community garden in the summer.",
  "training to start a family as soon as they saved enough.",
  "training to launch a tech startup with their local community.",
  "planning to finish medical school to honor their grandparents.",
  "training to travel across the country before turning thirty.",
  "excited to reunite with their estranged sibling to make their parents proud.",
  "planning to become a chef to honor their grandparents.",
  "preparing to open a small cafe next spring.",
  "working to buy their first home once the weather gets warmer.",
  "excited to open a small cafe for their children.",
  "looking forward to proposing to their partner with their local community.",
  "trying to plant a community garden after graduation.",
  "getting ready to adopt a rescue dog in the summer.",
  "studying to pay off their family's debt with their best friend.",
  "planning to buy their first home to make their parents proud.",
  "excited to rebuild a classic car before the decade ends.",
  "saving up to become a school teacher to make their parents proud.",
  "training to finish medical school once the weather gets warmer.",
  "preparing to go on a cross-country road trip to make their parents proud.",
  "studying to go on a cross-country road trip next spring.",
  "learning to build a library in their town before turning thirty.",
  "hoping to launch a tech startup next spring.",
  "preparing to graduate from university after graduation.",
  "about to travel across the country to make their parents proud.",
  "trying to get their pilot's license in their hometown.",
  "planning to become a school teacher in the countryside.",
  "getting ready to graduate from university to make their parents proud.",
  "waiting to run a local marathon before the decade ends.",
  "studying to become a chef as soon as they saved enough.",
  "learning to reunite with their estranged sibling after graduation.",
  "preparing to buy their first home after recovering from surgery.",
  "about to master woodworking after graduation.",
  "studying to run a local marathon for their children.",
  "training to propose to their partner to make their parents proud.",
  "about to master woodworking with their local community.",
  "working to finish medical school for their children.",
  "excited to run a local marathon before turning thirty.",
  "about to start a family in their hometown.",
  "training to open a small cafe as soon as they saved enough.",
  "about to learn a new language before the decade ends.",
  "planning to master woodworking after recovering from surgery.",
  "dreaming of taking their parents on a vacation in the countryside.",
  "learning to build a cabin with their sibling.",
  "excited to finish writing a novel in the summer.",
  "hoping to graduate from university after graduation.",
  "working to build a library in their town with their sibling.",
  "about to run a local marathon over the winter holidays.",
  "looking forward to paying off their family's debt to make their parents proud.",
  "learning to get their pilot's license in the countryside.",
  "learning to foster a child next spring.",
  "dreaming of fostering a child to honor their grandparents.",
  "looking forward to mastering woodworking after graduation.",
  "saving up to propose to their partner in the countryside.",
  "studying to rebuild a classic car to honor their grandparents.",
  "saving up to learn how to play the piano to make their parents proud.",
  "preparing to foster a child to celebrate their anniversary.",
  "trying to propose to their partner with their local community.",
  "planning to rebuild a classic car in the summer.",
  "excited to graduate from university with their local community.",
  "trying to master woodworking as soon as they saved enough.",
  "training to learn a new language this upcoming year.",
  "looking forward to finishing medical school next spring.",
  "waiting to become a chef with their sibling.",
  "about to rebuild a classic car before turning thirty.",
  "dreaming of taking their parents on a vacation with their best friend.",
  "waiting to adopt a rescue dog with their sibling.",
  "getting ready to run a local marathon after graduation.",
  "studying to open a small cafe after graduation.",
  "working to build a library in their town to honor their grandparents.",
  "trying to graduate from university this upcoming year.",
  "studying to retire by the ocean in the countryside.",
  "training to see the northern lights this upcoming year.",
  "trying to go on a cross-country road trip in the countryside.",
  "planning to take their parents on a vacation to celebrate their anniversary.",
  "training to launch a tech startup this upcoming year.",
  "looking forward to seeing the northern lights to make their parents proud.",
  "training to pay off their family's debt after graduation.",
  "trying to pay off their family's debt to make their parents proud.",
  "learning to travel across the country with their best friend.",
  "preparing to run a local marathon after graduation.",
  "looking forward to finishing medical school as soon as they saved enough.",
  "learning to foster a child with their best friend.",
  "trying to learn how to play the piano after graduation.",
  "saving up to reunite with their estranged sibling over the winter holidays.",
  "waiting to master woodworking once the weather gets warmer.",
  "preparing to foster a child in the countryside.",
  "waiting to pay off their family's debt as soon as they saved enough.",
  "about to rebuild a classic car after graduation.",
  "training to propose to their partner to honor their grandparents.",
  "about to start a family to make their parents proud.",
  "hoping to foster a child in their hometown.",
  "training to retire by the ocean with their local community.",
  "looking forward to finishing medical school in the summer.",
  "studying to get their pilot's license in their hometown.",
  "dreaming of proposing to their partner next spring.",
  "getting ready to graduate from university once the weather gets warmer.",
  "working to reunite with their estranged sibling to make their parents proud.",
  "preparing to go on a cross-country road trip once the weather gets warmer.",
  "saving up to adopt a rescue dog to honor their grandparents.",
  "excited to master woodworking before the decade ends.",
  "trying to pay off their family's debt before the decade ends.",
  "training to go on a cross-country road trip after recovering from surgery.",
  "hoping to buy their first home over the winter holidays.",
  "dreaming of building a library in their town to celebrate their anniversary.",
  "preparing to plant a community garden in the summer.",
  "looking forward to paying off their family's debt with their best friend.",
  "dreaming of taking their parents on a vacation for their children.",
  "training to pay off their family's debt in the summer.",
  "preparing to build a library in their town with their best friend.",
  "getting ready to start a family to celebrate their anniversary.",
  "preparing to rebuild a classic car after recovering from surgery.",
  "working to launch a tech startup once the weather gets warmer.",
  "about to pay off their family's debt to celebrate their anniversary.",
  "planning to take their parents on a vacation with their local community.",
  "excited to buy their first home next spring.",
  "planning to start a family in the countryside.",
  "trying to run a local marathon after recovering from surgery.",
  "studying to learn how to play the piano once the weather gets warmer.",
  "studying to learn how to play the piano to honor their grandparents.",
  "planning to become a chef for their children.",
  "excited to run a local marathon in their hometown.",
  "planning to build a cabin before the decade ends.",
  "looking forward to graduating from university with their best friend.",
  "working to get their pilot's license once the weather gets warmer.",
  "about to master woodworking in the summer.",
  "learning to get their pilot's license in the summer.",
  "dreaming of launching a tech startingup to honor their grandparents.",
  "studying to master woodworking to celebrate their anniversary.",
  "trying to build a cabin after graduation.",
  "about to plant a community garden in their hometown.",
  "training to plant a community garden with their best friend.",
  "getting ready to build a cabin after graduation.",
  "hoping to master woodworking next spring.",
  "hoping to build a library in their town for their children.",
  "looking forward to getting their pilot's license in their hometown.",
  "training to graduate from university in the summer.",
  "about to master woodworking in the countryside.",
  "training to launch a tech startup to celebrate their anniversary.",
  "dreaming of learning a new language for their children.",
  "excited to pay off their family's debt once the weather gets warmer.",
  "studying to learn a new language to honor their grandparents.",
  "trying to build a library in their town once the weather gets warmer.",
  "waiting to finish writing a novel next spring.",
  "saving up to become a chef to honor their grandparents.",
  "preparing to take their parents on a vacation in the countryside.",
  "looking forward to becoming a chef in the countryside.",
  "learning to go on a cross-country road trip as soon as they saved enough.",
  "working to start a family before turning thirty.",
  "dreaming of seeing the northern lights in their hometown.",
  "excited to run a local marathon after recovering from surgery.",
  "looking forward to mastering woodworking in the summer.",
  "saving up to foster a child before turning thirty.",
  "excited to foster a child with their local community.",
  "waiting to graduate from university with their best friend.",
  "saving up to learn a new language after recovering from surgery.",
  "looking forward to learning how to play the piano before turning thirty.",
  "about to propose to their partner next spring.",
  "preparing to open a small cafe with their best friend.",
  "looking forward to learning a new language as soon as they saved enough.",
  "saving up to buy their first home before the decade ends.",
  "saving up to open a small cafe before the decade ends.",
  "training to adopt a rescue dog with their local community.",
  "saving up to buy their first home to celebrate their anniversary.",
  "planning to take their parents on a vacation after recovering from surgery.",
  "waiting to reunite with their estranged sibling before the decade ends.",
  "saving up to finish writing a novel in their hometown.",
  "studying to launch a tech startup as soon as they saved enough.",
  "about to master woodworking after recovering from surgery.",
  "planning to learn a new language after graduation.",
  "working to get their pilot's license with their sibling.",
  "saving up to become a chef in their hometown.",
  "saving up to finish writing a novel after graduation.",
  "about to launch a tech startup in the summer.",
  "planning to master woodworking after graduation.",
  "studying to build a library in their town as soon as they saved enough.",
  "dreaming of fostering a child after recovering from surgery.",
  "excited to go on a cross-country road trip for their children.",
  "excited to master woodworking once the weather gets warmer.",
  "trying to retire by the ocean over the winter holidays.",
  "dreaming of traveling across the country before turning thirty.",
  "training to build a library in their town as soon as they saved enough.",
  "excited to build a cabin with their sibling.",
  "preparing to get their pilot's license to honor their grandparents.",
  "working to rebuild a classic car with their sibling.",
  "training to plant a community garden for their children.",
  "trying to get their pilot's license as soon as they saved enough.",
  "getting ready to finish writing a novel in their hometown.",
  "preparing to rebuild a classic car to honor their grandparents.",
  "learning to launch a tech startup with their sibling.",
  "saving up to learn a new language after graduation.",
  "preparing to build a library in their town as soon as they saved enough.",
  "waiting to become a school teacher to make their parents proud.",
  "looking forward to starting a family over the winter holidays.",
  "learning to launch a tech startup over the winter holidays.",
  "dreaming of opening a small cafe with their sibling.",
  "preparing to become a school teacher to make their parents proud.",
  "excited to graduate from university with their best friend.",
  "working to learn how to play the piano for their children.",
  "preparing to learn how to play the piano once the weather gets warmer.",
  "hoping to see the northern lights in the countryside.",
  "excited to travel across the country for their children.",
  "excited to see the northern lights in their hometown.",
  "getting ready to reunite with their estranged sibling in their hometown.",
  "dreaming of getting their pilot's license next spring.",
  "preparing to pay off their family's debt after graduation.",
  "working to master woodworking in their hometown.",
  "getting ready to travel across the country before turning thirty.",
  "trying to foster a child next spring.",
  "excited to build a library in their town before the decade ends.",
  "hoping to go on a cross-country road trip with their local community.",
  "dreaming of becoming a school teacher in the summer.",
  "trying to pay off their family's debt to celebrate their anniversary.",
  "looking forward to retiring by the ocean before turning thirty.",
  "getting ready to become a school teacher as soon as they saved enough.",
  "planning to start a family to honor their grandparents.",
  "excited to build a library in their town to celebrate their anniversary.",
  "hoping to master woodworking for their children.",
  "looking forward to becoming a chef before the decade ends.",
  "working to foster a child once the weather gets warmer.",
  "learning to plant a community garden to make their parents proud.",
  "about to learn how to play the piano as soon as they saved enough.",
  "looking forward to reuniting with their estranged sibling in the summer.",
  "saving up to graduate from university in the summer.",
  "studying to graduate from university to honor their grandparents.",
  "dreaming of building a cabin after recovering from surgery.",
  "waiting to finish writing a novel for their children.",
  "trying to foster a child with their sibling.",
  "preparing to learn how to play the piano as soon as they saved enough.",
  "preparing to get their pilot's license over the winter holidays.",
  "training to build a library in their town with their sibling.",
  "hoping to reunite with their estranged sibling in the countryside.",
  "learning to learn a new language in their hometown.",
  "about to build a library in their town before turning thirty.",
  "saving up to finish writing a novel as soon as they saved enough.",
  "saving up to become a school teacher in the countryside.",
  "getting ready to buy their first home in their hometown.",
  "dreaming of launching a tech startingup after graduation.",
  "studying to reunite with their estranged sibling after graduation.",
  "working to run a local marathon in the countryside.",
  "preparing to go on a cross-country road trip in the summer.",
  "excited to buy their first home over the winter holidays.",
  "studying to travel across the country to make their parents proud.",
  "learning to become a school teacher this upcoming year.",
  "studying to rebuild a classic car to celebrate their anniversary.",
  "hoping to open a small cafe once the weather gets warmer.",
  "trying to become a school teacher next spring.",
  "waiting to retire by the ocean this upcoming year.",
  "waiting to take their parents on a vacation before turning thirty.",
  "about to get their pilot's license this upcoming year.",
  "looking forward to planting a community garden in the countryside.",
  "planning to launch a tech startup as soon as they saved enough.",
  "training to open a small cafe for their children.",
  "getting ready to build a cabin in their hometown.",
  "excited to start a family in the summer.",
  "dreaming of graduating from university with their local community.",
  "hoping to become a chef with their sibling.",
  "trying to become a chef once the weather gets warmer.",
  "looking forward to taking their parents on a vacation next spring.",
  "training to become a chef after recovering from surgery.",
  "saving up to launch a tech startup over the winter holidays.",
  "trying to travel across the country next spring.",
  "waiting to finish writing a novel in the countryside.",
  "studying to open a small cafe with their local community.",
  "learning to propose to their partner before the decade ends.",
  "hoping to travel across the country to honor their grandparents.",
  "excited to learn a new language in their hometown.",
  "working to rebuild a classic car after graduation.",
  "about to graduate from university with their sibling.",
  "studying to propose to their partner to celebrate their anniversary.",
  "learning to rebuild a classic car this upcoming year.",
  "looking forward to seeing the northern lights next spring.",
  "working to learn how to play the piano to make their parents proud.",
  "trying to build a library in their town before turning thirty.",
  "training to learn how to play the piano after graduation.",
  "looking forward to buying their first home after recovering from surgery.",
  "trying to finish medical school in their hometown.",
  "learning to learn how to play the piano after recovering from surgery.",
  "about to become a school teacher after recovering from surgery.",
  "working to master woodworking to honor their grandparents.",
  "training to buy their first home after recovering from surgery.",
  "waiting to build a cabin after graduation.",
  "dreaming of retiring by the ocean for their children.",
  "training to take their parents on a vacation to honor their grandparents.",
  "getting ready to get their pilot's license for their children.",
  "waiting to finish writing a novel with their local community.",
  "looking forward to adopting a rescue dog with their best friend.",
  "saving up to get their pilot's license to make their parents proud.",
  "waiting to take their parents on a vacation in the summer.",
  "dreaming of becoming a chef once the weather gets warmer.",
  "hoping to rebuild a classic car in the countryside.",
  "hoping to buy their first home with their best friend.",
  "saving up to build a library in their town to honor their grandparents.",
  "looking forward to learning a new language with their local community.",
  "planning to take their parents on a vacation after graduation.",
  "preparing to start a family to make their parents proud.",
  "getting ready to plant a community garden this upcoming year.",
  "about to build a cabin with their best friend.",
  "waiting to finish medical school before turning thirty.",
  "studying to start a family this upcoming year.",
  "excited to propose to their partner in the summer.",
  "studying to travel across the country to celebrate their anniversary.",
  "trying to launch a tech startup to celebrate their anniversary.",
  "excited to become a school teacher with their best friend.",
  "studying to finish medical school next spring.",
  "about to start a family before the decade ends.",
  "excited to build a cabin next spring.",
  "training to take their parents on a vacation this upcoming year.",
  "looking forward to paying off their family's debt with their local community.",
  "getting ready to travel across the country with their sibling.",
  "saving up to take their parents on a vacation once the weather gets warmer.",
  "about to adopt a rescue dog for their children.",
  "learning to buy their first home for their children.",
  "planning to plant a community garden before turning thirty.",
  "waiting to master woodworking to make their parents proud.",
  "excited to take their parents on a vacation to make their parents proud.",
  "hoping to get their pilot's license in their hometown.",
  "hoping to buy their first home in their hometown.",
  "working to travel across the country after recovering from surgery.",
  "preparing to build a cabin with their local community.",
  "waiting to build a cabin as soon as they saved enough.",
  "learning to see the northern lights after recovering from surgery.",
  "hoping to graduate from university to make their parents proud.",
  "training to finish writing a novel to celebrate their anniversary.",
  "hoping to become a chef for their children.",
  "looking forward to mastering woodworking to celebrate their anniversary.",
  "training to go on a cross-country road trip to make their parents proud.",
  "looking forward to reuniting with their estranged sibling this upcoming year.",
  "dreaming of finishing medical school with their best friend.",
  "studying to open a small cafe in the summer.",
  "trying to open a small cafe for their children.",
  "looking forward to taking their parents on a vacation to make their parents proud.",
  "studying to see the northern lights to make their parents proud.",
  "studying to reunite with their estranged sibling before the decade ends.",
  "training to reunite with their estranged sibling over the winter holidays.",
  "learning to adopt a rescue dog next spring.",
  "looking forward to adopting a rescue dog next spring.",
  "training to become a school teacher in their hometown.",
  "training to become a chef next spring.",
  "learning to learn how to play the piano after graduation.",
  "waiting to propose to their partner for their children.",
  "learning to retire by the ocean once the weather gets warmer.",
  "studying to build a library in their town in the countryside.",
  "training to finish medical school to make their parents proud.",
  "studying to learn how to play the piano in their hometown.",
  "studying to travel across the country with their local community.",
  "working to take their parents on a vacation before the decade ends.",
  "studying to see the northern lights once the weather gets warmer.",
  "saving up to plant a community garden with their sibling.",
  "planning to become a chef before turning thirty.",
  "saving up to plant a community garden to celebrate their anniversary.",
  "waiting to become a chef this upcoming year.",
  "preparing to finish writing a novel in their hometown.",
  "trying to adopt a rescue dog with their best friend.",
  "learning to build a library in their town to honor their grandparents.",
  "hoping to finish medical school to make their parents proud.",
  "working to travel across the country in their hometown.",
  "trying to adopt a rescue dog once the weather gets warmer.",
  "trying to finish medical school to honor their grandparents.",
  "saving up to open a small cafe for their children.",
  "working to launch a tech startup before the decade ends.",
  "working to open a small cafe before the decade ends.",
  "excited to propose to their partner in the countryside.",
  "training to reunite with their estranged sibling once the weather gets warmer.",
  "about to become a chef to honor their grandparents.",
  "about to learn how to play the piano with their local community.",
  "trying to see the northern lights next spring.",
  "working to build a cabin next spring.",
  "preparing to finish medical school once the weather gets warmer.",
  "dreaming of learning how to play the piano to honor their grandparents.",
  "planning to take their parents on a vacation in the summer.",
  "training to master woodworking before the decade ends.",
  "working to graduate from university before the decade ends.",
  "saving up to see the northern lights as soon as they saved enough.",
  "hoping to reunite with their estranged sibling with their sibling.",
  "excited to finish medical school after recovering from surgery.",
  "looking forward to building a cabin to make their parents proud.",
  "planning to pay off their family's debt with their sibling.",
  "about to become a school teacher with their sibling.",
  "saving up to reunite with their estranged sibling in their hometown.",
  "hoping to finish medical school to honor their grandparents.",
  "saving up to retire by the ocean with their best friend.",
  "preparing to build a library in their town next spring.",
  "getting ready to foster a child to honor their grandparents.",
  "trying to buy their first home next spring.",
  "planning to become a chef to make their parents proud.",
  "dreaming of adopting a rescue dog to make their parents proud.",
  "planning to propose to their partner after recovering from surgery.",
  "getting ready to travel across the country after graduation.",
  "studying to rebuild a classic car as soon as they saved enough.",
  "trying to see the northern lights with their best friend.",
  "saving up to pay off their family's debt this upcoming year.",
  "excited to get their pilot's license as soon as they saved enough.",
  "trying to build a library in their town after recovering from surgery.",
  "learning to adopt a rescue dog as soon as they saved enough.",
  "getting ready to reunite with their estranged sibling this upcoming year.",
  "preparing to build a library in their town to celebrate their anniversary.",
  "waiting to graduate from university this upcoming year.",
  "trying to run a local marathon before turning thirty.",
  "saving up to travel across the country for their children.",
  "hoping to plant a community garden in their hometown.",
  "preparing to plant a community garden over the winter holidays.",
  "trying to finish medical school over the winter holidays.",
  "dreaming of buying their first home with their local community.",
  "about to propose to their partner with their best friend.",
  "planning to open a small cafe to make their parents proud.",
  "saving up to reunite with their estranged sibling to honor their grandparents.",
  "trying to learn how to play the piano once the weather gets warmer.",
  "studying to take their parents on a vacation before the decade ends.",
  "waiting to finish writing a novel before the decade ends.",
  "training to travel across the country to celebrate their anniversary.",
  "studying to rebuild a classic car in their hometown.",
  "hoping to finish medical school in their hometown.",
  "waiting to learn a new language in the summer.",
  "about to finish writing a novel as soon as they saved enough.",
  "learning to plant a community garden in the countryside.",
  "looking forward to proposing to their partner in the countryside.",
  "about to adopt a rescue dog in their hometown.",
  "trying to run a local marathon to make their parents proud.",
  "excited to launch a tech startup for their children.",
  "studying to run a local marathon next spring.",
  "working to become a chef once the weather gets warmer.",
  "preparing to run a local marathon over the winter holidays.",
  "preparing to reunite with their estranged sibling to celebrate their anniversary.",
  "learning to see the northern lights in their hometown.",
  "waiting to plant a community garden for their children.",
  "preparing to see the northern lights to honor their grandparents.",
  "preparing to pay off their family's debt over the winter holidays.",
  "saving up to finish writing a novel in the countryside.",
  "excited to go on a cross-country road trip once the weather gets warmer.",
  "trying to retire by the ocean once the weather gets warmer.",
  "looking forward to starting a family in the summer.",
  "looking forward to mastering woodworking with their sibling.",
  "working to see the northern lights in their hometown.",
  "planning to reunite with their estranged sibling with their local community.",
  "about to buy their first home to celebrate their anniversary.",
  "getting ready to go on a cross-country road trip in the summer.",
  "learning to open a small cafe in the summer.",
  "studying to propose to their partner before turning thirty.",
  "dreaming of buying their first home to make their parents proud.",
  "working to become a chef next spring.",
  "learning to pay off their family's debt to honor their grandparents.",
  "trying to graduate from university next spring.",
  "preparing to learn a new language to honor their grandparents.",
  "waiting to see the northern lights to celebrate their anniversary.",
  "waiting to buy their first home with their sibling.",
  "hoping to rebuild a classic car over the winter holidays.",
  "planning to go on a cross-country road trip with their best friend.",
  "learning to see the northern lights before the decade ends.",
  "planning to learn how to play the piano over the winter holidays.",
  "about to become a chef with their sibling.",
  "planning to retire by the ocean for their children.",
  "looking forward to planting a community garden before the decade ends.",
  "about to take their parents on a vacation as soon as they saved enough.",
  "saving up to adopt a rescue dog before the decade ends.",
  "getting ready to run a local marathon next spring.",
  "dreaming of retiring by the ocean in the countryside.",
  "studying to build a library in their town to make their parents proud.",
  "waiting to get their pilot's license over the winter holidays.",
  "studying to propose to their partner in the countryside.",
  "excited to plant a community garden to celebrate their anniversary.",
  "trying to launch a tech startup for their children.",
  "trying to see the northern lights after graduation."
];

const CELESTIAL_COLORS = [
  { core: '#ffd9e8', glow: 'rgba(255, 180, 210, 0.15)' },
  { core: '#d9e8ff', glow: 'rgba(180, 210, 255, 0.15)' },
  { core: '#ffebd9', glow: 'rgba(255, 220, 180, 0.15)' },
  { core: '#ffffff', glow: 'rgba(255, 255, 255, 0.10)' },
];

interface Particle {
  id: number;
  x: number;
  y: number;
  radius: number;
  colorData: typeof CELESTIAL_COLORS[0];
  isAlive: boolean;
  goal: string;
}

export default function DarkeningCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tooltip, setTooltip] = useState<{ visible: boolean; x: number; y: number; text: string }>({
    visible: false, x: 0, y: 0, text: ''
  });
  const [totalDead, setTotalDead] = useState(0);
  
  const particlesRef = useRef<Particle[]>([]);
  const deathSequenceRef = useRef<number[]>([]);
  const animationRef = useRef<number>();

  const cameraRef = useRef({ x: 0, y: 0, zoom: 1 });
  const dragRef = useRef({ isDragging: false, lastX: 0, lastY: 0 });

  const TOTAL_LIVES = 10000;
  const WORLD_SIZE = 8000; 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const initParticles = () => {
      const rng = mulberry32(9999); 
      const p: Particle[] = [];
      
      const spacing = Math.sqrt((WORLD_SIZE * WORLD_SIZE) / TOTAL_LIVES);
      
      let idCounter = 0;
      const halfWorld = WORLD_SIZE / 2;
      
      for (let y = -halfWorld; y < halfWorld; y += spacing) {
        for (let x = -halfWorld; x < halfWorld; x += spacing) {
          if (idCounter >= TOTAL_LIVES) break;
          
          p.push({
            id: idCounter,
            x: x + (rng() - 0.5) * spacing * 1.5,
            y: y + (rng() - 0.5) * spacing * 1.5,
            radius: rng() * 1.5 + 1.5,
            colorData: CELESTIAL_COLORS[Math.floor(rng() * CELESTIAL_COLORS.length)],
            isAlive: true,
            goal: BASE_GOALS[Math.floor(rng() * BASE_GOALS.length)]
          });
          idCounter++;
        }
      }
      particlesRef.current = p;

      const sequenceRng = mulberry32(12345);
      const sequence = Array.from({length: TOTAL_LIVES}, (_, i) => i);
      for (let i = sequence.length - 1; i > 0; i--) {
        const j = Math.floor(sequenceRng() * (i + 1));
        [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
      }
      deathSequenceRef.current = sequence;
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();
    initParticles();

    const applyDeaths = (deadCount: number) => {
      const p = particlesRef.current;
      const seq = deathSequenceRef.current;
      p.forEach(part => part.isAlive = true);
      const limit = Math.min(deadCount, TOTAL_LIVES);
      for(let i = 0; i < limit; i++) {
        const particleIndex = seq[i];
        if (p[particleIndex]) {
          p[particleIndex].isAlive = false;
        }
      }
    };
    const API_BASE = import.meta.env.PUBLIC_API_URL || 'http://localhost:3001';
    fetch(`${API_BASE}/api/state`)
      .then(res => res.json())
      .then(data => {
        setTotalDead(data.totalCasualties);
        applyDeaths(data.totalCasualties);
      }).catch(() => {});

    const eventSource = new EventSource(`${API_BASE}/api/stream`);
    eventSource.addEventListener('casualty', (e) => {
      const data = JSON.parse(e.data);
      setTotalDead(data.totalCasualties);
      applyDeaths(data.totalCasualties);
    });

    const render = () => {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cam = cameraRef.current;
      const p = particlesRef.current;

      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.scale(cam.zoom, cam.zoom);
      ctx.translate(-cam.x, -cam.y);

      const viewWidth = canvas.width / cam.zoom;
      const viewHeight = canvas.height / cam.zoom;
      const left = cam.x - viewWidth / 2;
      const right = cam.x + viewWidth / 2;
      const top = cam.y - viewHeight / 2;
      const bottom = cam.y + viewHeight / 2;

      for (let i = 0; i < p.length; i++) {
        const orb = p[i];
        const cullPadding = orb.radius * 4;

        if (
          orb.x < left - cullPadding || 
          orb.x > right + cullPadding || 
          orb.y < top - cullPadding || 
          orb.y > bottom + cullPadding
        ) {
          continue; 
        }

        if (orb.isAlive) {
          const time = performance.now() * 0.002;
          const twinkle = 1 + 0.25 * Math.sin(time + orb.id);

          ctx.fillStyle = orb.colorData.glow;
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.radius * 3.5 * twinkle, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = orb.colorData.core;
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = '#780606';
          ctx.strokeStyle = '#78060680';
          ctx.lineWidth = 1.5 / cam.zoom;
          ctx.beginPath();
          ctx.arc(orb.x, orb.y, orb.radius * 1.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
      }
      ctx.restore();
      animationRef.current = requestAnimationFrame(render);
    };
    render();

    const handleMouseDown = (e: MouseEvent) => {
      dragRef.current = { isDragging: true, lastX: e.clientX, lastY: e.clientY };
      canvas.style.cursor = 'grabbing';
    };

    const handleMouseUp = () => {
      dragRef.current.isDragging = false;
      canvas.style.cursor = 'grab';
    };

    const clampCamera = () => {
      const cam = cameraRef.current;
      const minZoom = Math.max(canvas.width / WORLD_SIZE, canvas.height / WORLD_SIZE);
      cam.zoom = Math.max(minZoom, Math.min(cam.zoom, 10));

      const viewWidth = canvas.width / cam.zoom;
      const viewHeight = canvas.height / cam.zoom;
      const halfWorld = WORLD_SIZE / 2;

      const maxX = halfWorld - viewWidth / 2;
      const minX = -halfWorld + viewWidth / 2;
      cam.x = Math.max(minX, Math.min(cam.x, maxX));

      const maxY = halfWorld - viewHeight / 2;
      const minY = -halfWorld + viewHeight / 2;
      cam.y = Math.max(minY, Math.min(cam.y, maxY));
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      if (dragRef.current.isDragging) {
        const dx = e.clientX - dragRef.current.lastX;
        const dy = e.clientY - dragRef.current.lastY;
        
        cameraRef.current.x -= dx / cameraRef.current.zoom;
        cameraRef.current.y -= dy / cameraRef.current.zoom;
        
        dragRef.current.lastX = e.clientX;
        dragRef.current.lastY = e.clientY;
        
        setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev);
        clampCamera();
        return;
      }

      const cam = cameraRef.current;
      const worldX = (mouseX - canvas.width / 2) / cam.zoom + cam.x;
      const worldY = (mouseY - canvas.height / 2) / cam.zoom + cam.y;

      let found = false;
      const p = particlesRef.current;
      
      for (let i = 0; i < p.length; i++) {
          const dx = worldX - p[i].x;
          const dy = worldY - p[i].y;
          const interactionRadius = 250 / cam.zoom; 
          
          if (dx * dx + dy * dy < interactionRadius) { 
            const prefix = p[i].isAlive ? "Is " : "Was ";

            setTooltip({
              visible: true,
              x: e.clientX,
              y: e.clientY,
              text: prefix + p[i].goal
            });
            found = true;
            break;
          }
      }
      if (!found) setTooltip(prev => prev.visible ? { ...prev, visible: false } : prev);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSensitivity = 0.001;
      const cam = cameraRef.current;
      
      const mouseX = e.clientX - canvas.width / 2;
      const mouseY = e.clientY - canvas.height / 2;
      const worldXBeforeZoom = mouseX / cam.zoom + cam.x;
      const worldYBeforeZoom = mouseY / cam.zoom + cam.y;

      cam.zoom *= Math.exp(-e.deltaY * zoomSensitivity);
      cam.zoom = Math.max(0.2, Math.min(cam.zoom, 10)); 

      cam.x = worldXBeforeZoom - mouseX / cam.zoom;
      cam.y = worldYBeforeZoom - mouseY / cam.zoom;

      clampCamera();
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('wheel', handleWheel, { passive: false });
    canvas.style.cursor = 'grab';

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('wheel', handleWheel);
      eventSource.close();
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden font-sans">
      <canvas ref={canvasRef} className="block w-full h-full" />
      
      {tooltip.visible && (
        <div 
          className="fixed z-[100] p-4 w-64 bg-zinc-900/95 border border-zinc-700 text-zinc-300 rounded-lg shadow-2xl pointer-events-none transform -translate-x-1/2 -translate-y-[calc(100%+20px)] backdrop-blur-md transition-opacity duration-150"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <p className="text-sm italic font-light leading-relaxed">
            "{tooltip.text}"
          </p>
        </div>
      )}

      <div className="fixed top-8 left-8 pointer-events-none z-50 flex flex-col gap-4 bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg backdrop-blur-md w-fit mt-4">
        <div>
          <h1 className="text-zinc-400 text-2xl font-light tracking-widest uppercase">The Cost of War 2026</h1>
          <p className="text-zinc-500 text-sm mt-2 max-w-sm leading-relaxed">
            Every light represents a human trajectory. <br/>
            Each red trace represents a lost life. <br/>
            Click and drag to pan. Scroll to zoom.
          </p>
        </div>
        
        <p className="text-zinc-500 text-xs uppercase tracking-wider mt-2">Lives Extinguished</p>
        <p className="text-red-400/90 text-4xl font-mono font-light tracking-tight">
          {totalDead.toLocaleString()}
        </p>
      </div>

      <div className="fixed top-8 right-8 pointer-events-none z-50 flex flex-col gap-4 bg-zinc-900/80 border border-zinc-800 p-4 rounded-lg backdrop-blur-md w-fit mt-4">
        <div>
          <h1 className="text-zinc-400 text-2xl font-light tracking-widest uppercase">Controls</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="128px" height="128px" viewBox="0 0 24 24" fill="none">
            <path d="M19 8.97414V14.9861C19 18.8598 15.866 22 12 22C8.13401 22 5 18.8598 5 14.9861V8.97414C5 5.35433 7.73668 2.37497 11.25 2V5.38542C10.6588 5.66685 10.25 6.27067 10.25 6.97016V8.97414C10.25 9.94256 11.0335 10.7276 12 10.7276C12.9665 10.7276 13.75 9.94256 13.75 8.97414V6.97016C13.75 6.27067 13.3412 5.66685 12.75 5.38542V2C16.2633 2.37497 19 5.35433 19 8.97414Z" fill="#1C274C"/>
          </svg>
          <p className="text-zinc-400 text-sm mt-2 max-w-sm leading-relaxed">
            Click and drag to pan. <br/>
            Scroll to zoom.
          </p>
        </div>
      </div>
    </div>
  );
}