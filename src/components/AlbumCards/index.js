import React, { useEffect, useRef } from "react";

// import * as THREE from "three";
import { WebGLRenderer, Scene, PerspectiveCamera, PlaneGeometry, ShaderMaterial, Vector2, Mesh } from "three";
import { rgb, randomInteger, sceneTraverse } from "./util";
import { noise, fragment, vertex } from "./shaders";
import "./styles.css";

import TestChart from "../../services/vision/components/GlobalChart";

const config = {
  individualItem: ".album-item", // class of individual ref.current
  carouselWidth: 1000, // in px
  carouselId: "#album-rotator", // carousel selector
  carouselHolderId: "#album-rotator-holder",
  colors: [
    { low: rgb(38, 176, 230), high: rgb(0, 128, 230) }, // light blue
    { low: rgb(236, 166, 15), high: rgb(233, 104, 0) }, // yellow
    { low: rgb(32, 33, 36), high: rgb(0, 0, 0) }, //black
    { low: rgb(43, 75, 235), high: rgb(213, 51, 248) }, // purple
  ],
};

const AlbumCards = () => {
  const cards = [
    {
      id: "Test1",
      icon: "Test1",
      color: config.colors[0],
      // remove Child Chart Element and memory leak goes away
      subtitle: <TestChart display="liquidity" />,
      type: "chart",
    },
    {
      id: "Test2",
      icon: "Test2",
      color: config.colors[1],
      // remove Child Chart Element and memory leak goes away
      subtitle: <TestChart display="volume" />,
      type: "chart",
    },
    {
      id: "Test3",
      icon: "Test3",
      color: config.colors[2],
      title: "Test3",
      subtext: "No Children",
    },
  ];
  return (
    <>
      <div className="album-cards relative">
        <div id="album-rotator">
          <div id="album-rotator-holder" className="py-4">
            {cards.map((card) => {
              return (
                <AlbumCard
                  key={card.id}
                  type={card.type}
                  color={card.color}
                  icon={card.icon}
                  title={card.title}
                  subtitle={card.subtitle}
                  subtext={card.subtext}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const AlbumCard = ({ color, icon, title, subtitle, subtext, type }) => {
  const ref = useRef(null);
  const requestRef = useRef();

  useEffect(() => {
    if (ref.current) {
      let renderer = new WebGLRenderer({
        powerPreference: "high-performance",
        antialias: true,
        alpha: true,
      });
      const elWidth = parseFloat(250);
      const elHeight = parseFloat(300);

      // Set sizes and set scene/camera
      renderer.setSize(elWidth, elHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      ref.current.appendChild(renderer.domElement);

      let scene = new Scene();
      let camera = new PerspectiveCamera(75, elWidth / elHeight, 0.1, 1000);
      let high = color.high;
      let low = color.low;

      // And use the high color for the subtext.
      if (ref.current.querySelector(".subtext") !== null) {
        ref.current.querySelector(".subtext").style.background = `rgba(${high.x},${high.y},${high.z},0.75)`;
      }
      if (ref.current.querySelector(".icon-chart") !== null) {
        ref.current.querySelector(".icon-chart").style.background = `rgba(${high.x},${high.y},${high.z},0.50)`;
      }

      // Create a plane, and pass that through to our shaders
      let geometry = new PlaneGeometry(600, 600, 100, 100);
      let material = new ShaderMaterial({
        uniforms: {
          u_lowColor: { type: "v3", value: low },
          u_highColor: { type: "v3", value: high },
          u_time: { type: "f", value: 0 },
          u_height: { type: "f", value: 1 },
          u_rand: { type: "f", value: new Vector2(randomInteger(6, 10), randomInteger(8, 10)) },
        },
        fragmentShader: noise + fragment,
        vertexShader: noise + vertex,
      });

      // Create the mesh and position appropriately
      let mesh = new Mesh(geometry, material);
      mesh.position.set(0, 0, -300);
      scene.add(mesh);
      geometry.dispose();
      material.dispose();

      // On hover effects for each ref.current
      let enterTimer, exitTimer;
      ref.current.addEventListener("mouseenter", function (e) {
        if (typeof exitTimer !== "undefined") {
          clearTimeout(exitTimer);
        }
        enterTimer = setInterval(function () {
          if (mesh.material.uniforms.u_height.value >= 0.5) {
            mesh.material.uniforms.u_height.value -= 0.05;
          } else {
            clearTimeout(enterTimer);
          }
        }, 10);
      });
      ref.current.addEventListener("mouseleave", function (e) {
        if (typeof enterTimer !== "undefined") {
          clearTimeout(enterTimer);
        }
        exitTimer = setInterval(function () {
          if (mesh.material.uniforms.u_height.value < 1) {
            mesh.material.uniforms.u_height.value += 0.05;
          } else {
            clearTimeout(exitTimer);
          }
        }, 10);
      });

      // Render
      renderer.render(scene, camera);
      let t = 0;

      // Animate
      const animate = function () {
        requestRef.current = requestAnimationFrame(animate);
        renderer.render(scene, camera);
        mesh.material.uniforms.u_time.value = t;
        t = t + 0.02;
      };
      animate();

      return () => {
        // Cleanup functions

        // dispose geometries and materials in scene
        sceneTraverse(scene, (o) => {
          if (o.geometry) {
            o.geometry.dispose();
            //console.log("dispose geometry ", o.geometry);
          }
          if (o.material) {
            if (o.material.length) {
              for (let i = 0; i < o.material.length; ++i) {
                o.material[i].dispose();
                //console.log("dispose material ", o.material[i]);
              }
            } else {
              o.material.dispose();
              //console.log("dispose material ", o.material);
            }
          }
        });
        // remove listeners
        document.body.removeEventListener("mouseleave", () => {});
        document.body.removeEventListener("mouseenter", () => {});

        window.cancelAnimationFrame(requestRef.current);
        ref.current.removeChild(renderer.domElement);

        //renderer.context.getExtension("WEBGL_lose_context").loseContext();
        renderer.forceContextLoss();
        //renderer.context = null;
        renderer.renderLists.dispose();
        renderer.dispose();

        scene = null;
        camera = null;
        renderer.domElement = null;
        renderer = null;
      };
    }
  }, [ref]);

  useEffect(() => {
    // Get items
    const el = document.querySelector(config.individualItem);
    const elWidth =
      parseFloat(window.getComputedStyle(el).width) +
      parseFloat(window.getComputedStyle(el).marginLeft) +
      parseFloat(window.getComputedStyle(el).marginRight);

    // Track carousel
    let mousedown = false;
    let movement = false;
    let initialPosition = 0;
    let selectedItem;
    let currentDelta = 0;

    document.querySelectorAll(config.carouselId).forEach(function (item) {
      item.style.width = `${config.carouselWidth}px`;
    });

    document.querySelectorAll(config.carouselId).forEach(function (item) {
      item.addEventListener("pointerdown", function (e) {
        mousedown = true;
        selectedItem = item;
        initialPosition = e.pageX;
        currentDelta =
          parseFloat(item.querySelector(config.carouselHolderId).style.transform.split("translateX(")[1]) || 0;
      });
    });

    const scrollCarousel = function (change, currentDelta, selectedItem) {
      let numberThatFit = Math.floor(config.carouselWidth / elWidth);
      let newDelta = currentDelta + change;
      let elLength = selectedItem.querySelectorAll(config.individualItem).length - numberThatFit;
      if (newDelta <= 0 && newDelta >= -elWidth * elLength) {
        selectedItem.querySelector(config.carouselHolderId).style.transform = `translateX(${newDelta}px)`;
      } else {
        if (newDelta <= -elWidth * elLength) {
          selectedItem.querySelector(config.carouselHolderId).style.transform = `translateX(${-elWidth * elLength}px)`;
        } else if (newDelta >= 0) {
          selectedItem.querySelector(config.carouselHolderId).style.transform = `translateX(0px)`;
        }
      }
    };

    document.body.addEventListener("pointermove", function (e) {
      if (mousedown === true && typeof selectedItem !== "undefined") {
        let change = -(initialPosition - e.pageX);
        scrollCarousel(change, currentDelta, document.body);
        document.querySelectorAll(`${config.carouselId} a`).forEach(function (item) {
          item.style.pointerEvents = "none";
        });
        movement = true;
      }
    });

    ["pointerup", "mouseleave"].forEach(function (item) {
      document.body.addEventListener(item, function (e) {
        selectedItem = undefined;
        movement = false;
        document.querySelectorAll(`${config.carouselId} a`).forEach(function (item) {
          item.style.pointerEvents = "all";
        });
      });
    });

    document.querySelectorAll(config.carouselId).forEach(function (item) {
      let trigger = 0;
      item.addEventListener("wheel", function (e) {
        if (trigger !== 1) {
          ++trigger;
        } else {
          let change = e.deltaX * -3;
          let currentDelta =
            parseFloat(item.querySelector(config.carouselHolderId).style.transform.split("translateX(")[1]) || 0;
          scrollCarousel(change, currentDelta, item);
          trigger = 0;
        }
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
      });
    });

    return () => {
      document.body.removeEventListener("pointerdown", () => {});
      document.body.removeEventListener("pointerup", () => {});
      document.body.removeEventListener("pointermove", () => {});
      document.body.removeEventListener("wheel", () => {});
    };
  }, [ref]);

  return (
    <>
      <div className="album-item" ref={ref}>
        <span className="album-details">
          {icon && (
            <span className={type === "chart" ? "icon-chart pt-4 px-4" : "icon pt-4 px-4"}>
              <i className="far fa-at"></i>
              {icon}
            </span>
          )}
          {title && <span className="title mx-4">{title}</span>}
          {subtitle && <span className={type === "chart" ? "subtitle-chart" : "subtitle"}>{subtitle} </span>}
          {subtext && <span className="subtext">{subtext}</span>}
        </span>
      </div>
    </>
  );
};

export default AlbumCards;
