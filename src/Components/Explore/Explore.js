import React, { Component } from 'react'
import CategoryFilter from '../CategoryFilter/CategoryFilter'
import '../../Styles/Explore.css'


export default class Explore extends Component {
    render() {
        return (
            <section className='exploreContainer'>
                <h2 className='exploreH2'>Articles</h2>
                <div className='filterContainer'>
                    <CategoryFilter />
                </div>
            </section>
        )
    }
}